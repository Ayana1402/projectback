const express = require('express')
const router = express.Router()
const StudentData = require("../Models/StudentData")
const UserData = require("../Models/UserData")
const bcrypt = require("bcryptjs")

router.post('/', async (req, res) => {
    try {
        const { username, password, phone, first_name, last_name, topic_status, topic_id, start_date} = req.body;
        console.log(req.body)
        const student = await StudentData.findOne({username});
        console.log("student data",student)
        if (!student) {
            const hashedPwd = bcrypt.hashSync(password, 8)
            const user = await UserData.create({username, password:hashedPwd, first_name, last_name, phone, topic_status, topic_id, start_date})
            res.status(200).json({success: true, message: "Successfully created the user"})
        } else {
            const score = student.exit_score ;

            if (score < 40) {
                res.status(401).json({success: false, message: "Student does not meet minimum mark criteria"});
            } else {
                const hashedPwd = bcrypt.hashSync(password, 8)
                const user = await UserData.create({username, password:hashedPwd, first_name, last_name, phone, topic_status, topic_id, start_date})
                res.status(200).json({success: true, message: "Successfully created the user"})
            }
        }
    }catch (err) {
        console.error('Error:', err);
        res.status(400).json({message: "email already taken"})
        // res.json({ success: false });
        // return;
    }
})
module.exports = router;