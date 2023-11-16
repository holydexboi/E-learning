const { v4 } = require("uuid");
const { nanoid } = require("nanoid");
const Instructor = require("../models/instructor");

Instructor.createTable();

async function createInstuctor(req, res) {
  if (!req.body.firstName)
    return res.status(400).json({ message: "First Name is not define" });
  if (!req.body.lastName)
    return res.status(400).json({ message: "Last Name is not define" });
  if (!req.body.gender)
    return res.status(400).json({ message: "Gender is not define" });
  let profilePic = "";
  const file = req.files?.profilePic;
  if (file) {
    const type = file.mimetype.split("/")[1];
    profilePic = nanoid() + "." + type;
    file.mv("./uploads/images/instructor/" + profilePic + "." + type, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        console.log("File  uploadeded successfully");
      }
    });
  }
  const { firstName, lastName, gender } = req.body;

  try {
    const id = v4();
    const instructor = await Instructor.createInstuctor({
      id,
      firstName,
      lastName,
      gender,
      profilePic,
    });

    res.json({ message: "Instructor created Successfully" });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function getInstructors(req, res) {
  try {
    const output = await Instructor.getInstructors();

    if (!output[0])
      return res.status(400).json({ message: "No Instructor in the database" });

    res.json({ ...output });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getInstructorById(req, res) {
  try {
    const output = await Instructor.getInstructorById(req.params.id);

    if (!output[0])
      return res
        .status(400)
        .json({ message: "No Instructor with the given Id" });

    res.json({ ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function updateInstructor(req, res) {
  const instructorId = req.params.id;
  const firstName = req.body?.firstName;
  const lastName = req.body?.lastName;
  const file = req.files?.profilePic;
  let profilePic = "";
  if (file) {
    const type = file.mimetype.split("/")[1];
    profilePic = nanoid() + "." + type;
    file.mv("./uploads/images/instructor/" + profilePic + "." + type, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        console.log("File  uploadeded successfully");
      }
    });
  }
  try {
    const output = await Instructor.updateInstructor({
      id: instructorId,
      firstName,
      lastName,
      profilePic,
    });

    if (!output[0])
      return res.status(400).json({ message: "Invalid InstructorId" });

    res.json({ ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function rateInstructor(req, res) {
  const instructorId = req.params.id;
  if (!req.body.rate)
    return res.status(400).json({ message: "rate is not define" });
  const { rate } = req.body;
  try {
    const output = await Instructor.rateInstructor({
      id: instructorId,
      rate: parseFloat(rate),
    });

    if (!output[0])
      return res.status(400).json({ message: "Invalid InstructorId" });

    res.json({ ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

module.exports = {
  createInstuctor,
  getInstructors,
  getInstructorById,
  updateInstructor,
  rateInstructor,
};
