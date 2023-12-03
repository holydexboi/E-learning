const { v4 } = require("uuid");
const { nanoid } = require("nanoid");
const UserTest = require("../models/userTest");

UserTest.createTable();

async function takeTest(req, res) {
  const user = req.user?._id;
  if (!req.body.lesson)
    return res.status(400).json({ message: "Lesson Id is not define" });

  const { lesson } = req.body;

  try {
    const id = v4();
    const user_test = await UserTest.takeTest({
      id,
      user,
      lesson,
      score: 0.0,
      tests: ""
    });
    res.json({ message: "Registered test Successfully", data: user_test });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }

  
}

async function getUserTest(req, res) {
  const userId = req.user?._id;
  try {
    const user_test = await UserTest.getUserTest(userId);
    if (!user_test[0])
      return res
        .status(400)
        .json({ message: "User has no Test in the database" });

    res.json([ ...user_test ]);
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function update_score(req, res) {
  const user = req.user._id;

  if (!req.body.testId)
    return res.status(400).json({ message: "Test Id is not define" });

  if (!req.body.answer)
    return res.status(400).json({ message: "Answer Id is not define" });
  const { testId, answer } = req.body;
  try {
    const user_test = await UserTest.updateTest({
      id: req.params.id,
      user,
      testId,
      answer,
    });
    if (!user_test[0])
      return res.status(400).json({ message: "User has no related test" });

    res.json({ ...user_test[0] });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

module.exports = {
  takeTest,
  getUserTest,
  update_score,
};
