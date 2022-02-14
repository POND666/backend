const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const auth = require('../middleware/auth');

router.get("",bookController.getBook);

router.get("/:id",bookController.getBookById);

router.get("/name/:name",bookController.getBookByName);

router.post("/addbook",bookController.addBook);

router.put("/:id",bookController.editBook);

router.delete("/:id",bookController.deleteBook);

module.exports = router;
