const express = require('express');
const app = express.Router();
const borrowController = require("../controller/borrowController");


app.get("/member/:id", borrowController.getBorrowDataByMember);
app.get("/book/:id", borrowController.getBorrowDataByBook);

app.post("/", borrowController.borrowBook);

app.patch("/return/:id", borrowController.returnBook);

module.exports = app;