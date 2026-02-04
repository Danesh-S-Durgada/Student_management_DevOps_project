const express = require("express");
const Student = require("../models/studentModel");
const Attendance = require("../models/attendanceModel");
const router = express.Router();
// Add a student
router.post("/", async (req, res) => {
  const { name, rollNo } = req.body;
  //   console.log(name, rollNo);

  try {
    const student = new Student({ name, rollNo });
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Mark attendance
// router.post("/attendance", async (req, res) => {
//   const { studentId, date, status } = req.body;
//   console.log(studentId, date, status);

//   try {
//     const attendance = new Attendance({ student: studentId, date, status });
//     await attendance.save();
//     res.status(201).send(attendance);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
router.post("/attendance", async (req, res) => {
  const { studentId, date, status } = req.body;

  try {
    const attendance = new Attendance({
      student: studentId,
      date: new Date(date), // ✅ cast to Date
      status: status.charAt(0).toUpperCase() + status.slice(1), // present → Present
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Attendance save failed",
      error: err.message,
    });
  }
});

// Get attendance by student
// router.get("/attendance/:studentId", async (req, res) => {
//   try {
//     const attendance = await Attendance.find({
//       student: req.params.studentId,
//     }).populate("student");
//     res.status(200).send(attendance);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
// Get all students
router.get("/", async (req, res) => {
  // console.log("hitting api");

  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
