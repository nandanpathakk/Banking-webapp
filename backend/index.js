const express = require("express");
const cors = require("cors");

const app = express();
 
app.use(cors()); // cors middleware
app.use(express.json()); // to support json body in post request
 
const mainRouter = require("./routes/index.js");  // this should below the middleware that's why it's below cors and express.json


app.use("/api/v1", mainRouter)   // reqeust comming to "/api/v1" are directed to -----> router

app.listen(3000,() =>{
    console.log("Server running on port 3000")
})
