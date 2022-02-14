const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController');
const auth = require('../middleware/auth');

router.get("/",staffController.getStaff);
router.get("/:id",staffController.getStaffById);

router.post("/addStaff",staffController.addStaff);
router.post("/login",staffController.login);

router.put("/:id",staffController.updateStaff);

router.delete("/:id",auth,staffController.deleteStaff);

module.exports = router;
