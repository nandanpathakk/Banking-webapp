const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware")

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

const UpdatedUser = zod.object({
    username: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

const router = express.Router();

router.post("/signup", async function (req, res) {
    const body = req.body;
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            msg: "Incorrect inputs"
        });
    };

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            msg: "Emali already taken/ Incorrect password"
        });
    }
    
    console.log(req.body.username)
    const user = await User.create(body);

    const userId = user._id;

    await Account.create({
        userId,
        balance: Math.random() * (100000 -1) + 1 // random balance between 1 to 100000 is alloted to the user on signup because we dont have real banks and users here 
    })

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message: "user created successfully",
        token: token
    });
});

router.post("/signin", async function (req, res) {
    const body = req.body;
    const { success } = signInBody.safeParse(body)

    if (!success) {
        return res.status(411).json({
            message: "Enter Valid inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (existingUser) {
        const token = jwt.sign({ userId: User._id }, JWT_SECRET)

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while loggin in"
    })


});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = UpdatedUser.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message : "Error while updating information"
        });

        await User.updateOne({_id: req.userId}, req.body);

        res.json({
            message: "updated Successfully"
        })
    }

});

router.get("/bulk", async (req, res) => {
    
    filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user :users.map( user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })) 
    })
})

module.exports = router;