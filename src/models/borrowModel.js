const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
    borrower: {
        memberID: String,
        name: String
    },
    book: {
        bookID: String,
        name: String,
        author: String
    },
    borrowDate: { type: Date, default: Date.now },
    dueDate: Date,
    lender: {
        staffID: String,
        name: String
    },
    receiver:{
        staffID: String,
        name: String
    },
    returnedDate: Date
}, { timestamps: true });

// export Product Schema to be usable in other components
module.exports = mongoose.model("Borrow", borrowSchema);