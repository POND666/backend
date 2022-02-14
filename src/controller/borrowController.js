const Borrow = require("../models/borrowModel");

exports.borrowBook = async(req, res) => {
    try {
        let borrow = new Borrow(req.body);
        // borrow.dueDate = new Date().setDate(new Date() + 7);
        let createdBorrow = await borrow.save();

        //กำหนด data ของ dueDate แล้วค่อยเอาไป update หลังจากที่ insert แล้ว
        let dDate = new Date(createdBorrow.borrowDate)
        // การหาจำนวนวัน
        // let member = Member.find({ member_id: createdBorrow.borrower.member_id });
        let data = { 
            //เพิ่มวันตามประเภทสมาชิก เปลี่ยน 120 เป็น member.dayCanborrow
            dueDate : dDate.setDate(dDate.getDate()+ 120)    
        };
        //update โดยใส่ฟิลด์ dueDate แล้วให้ return เป็นผลลัพธ์
        Borrow.findByIdAndUpdate(createdBorrow._id, data).exec((err, result)=>{
            Borrow.findById(createdBorrow._id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Borrow savedeeeeeeeee",
                        data: result
                    });
                });
        });
    } catch (err) {
        // if there is an error, it will jump to here
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

// คืนหนังสือ = แก้ไข borrow โดยเพิ่มฟิลด์ returnedDate โดยเก็บวัน/เวลาปัจจุบัน
exports.returnBook = async(req, res) => {
    let data = { 
            returnedDate : new Date(),
            receiver: req.body.receiver
        }; 
    Borrow.findByIdAndUpdate(req.params.id, data).exec((err, result)=>{
            Borrow.findById(req.params.id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Return book saved",
                        data: result
                    });
                });
        });
};

// Search ประวัติการยืมตามรหัสสมาชิก
exports.getBorrowDataByMember = async (req, res) => {
    let memberID = req.params.id;
    console.log(memberID);
    Borrow.find({ "borrower.member_id": memberID })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

// Search ประวัติการยืมตามรหัสหนังสือ
exports.getBorrowDataByBook = async (req, res) => {
    let bookID = req.params.id;
    console.log(bookID);
    Borrow.find({ "book.bookID": bookID })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.borrowBook02 = async(req, res)=>{
    try {
        //Find member
        let member = Member.find({ memberID: req.body.memberID });
        let book = Book.find({ bookID: req.body.bookID });
        let lender = Staff.find({ staffID: req.body.staffID });

        let borrow = new Borrow({
            borrower: {
                memberID: member.memberID,
                name: member.name
            },
            book:{
                bookID: book.bookID,
                name: book.name
            },
            lender:{
                staffID: lender.staffID,
                name: lender.name
            }
        });
        let createdBorrow = await borrow.save();
        //นอกนั้นทำเหมือนเดิม
        let data = { 
            //เพิ่มวันตามประเภทสมาชิก เปลี่ยน 120 เป็น member.dayCanborrow
            dueDate : dDate.setDate(dDate.getDate()+ 120)    
        };
        //update โดยใส่ฟิลด์ dueDate แล้วให้ return เป็นผลลัพธ์
        Borrow.findByIdAndUpdate(createdBorrow._id, data).exec((err, result)=>{
            Borrow.findById(createdBorrow._id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Borrow savedeeeeeeeee",
                        data: result
                    });
                });
        });
    } catch (error) {
        // if there is an error, it will jump to here
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};