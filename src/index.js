require('dotenv').config({path:'./config.env'});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4001;

const staffRouter = require("./router/staffRouter");
const memberRouter = require("./router/memberRouter");
const bookRouter = require("./router/bookRouter");
const borrowRouter = require("./router/borrowRouter");

const app = express();
app.use(cors());
app.use(bodyParser.json());

require("./db")(app);

app.use("/staff",staffRouter);
app.use("/member",memberRouter);
app.use("/book",bookRouter);
app.use("/borrow",borrowRouter);

app.get("/",(req,res)=>{
    res.send("Hello Index");
});

app.listen(port,()=>{
    console.log("App is running on port " + port);
});