const express = require("express");
const {Account } = require("../db");
const { authMiddleware } = require("../middleware");
const zod = require("zod");
const mongoose = require('mongoose');

const transferBody = zod.object({
    to: zod.string(),
    amount: zod.number()
})

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {

    const account = await Account.findOne({
        useId: req.userId
    })

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to } = req.body;

    
    // const { success } = transferBody.safeParse(req.body);

    // if (!success) {
    //     await session.abortTransaction();
    //     return res.status(411).json({
    //         message: "Enter valid details"
    //     })
    // }

    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    // if (!account) {
    //     res.status(411).json({
    //         message: "Invalid Account"
    //     })
    // }

    if(!account || account.balance < req.amount){
        await session.abortTransaction();
        res.status(411).json({
            message: "Insufficient balance"
        })
    };

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    },{
        $inc: {
            balance: -amount
        }
    }).session(session);
    const router = express.Router();
    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

module.exports = router;