const { v4 } = require("uuid");
const { nanoid } = require("nanoid");
const Test = require("../models/test");

Test.createTable();

async function createTest(req, res) {
  if (!req.body.lesson)
    return res.status(400).json({ message: "Lesson Id is not define" });
  if (!req.body.tests)
    return res.status(400).json({ message: "Tests is not define" });

  const { lesson, tests } = req.body;

  try {
    tests.forEach(async (test) => {
      const id = v4();
      await Test.createTest({
        id,
        lesson,
        question: test.question,
        answer: test.answer,
        type: test.type,
        optionA: test.optionA,
        optionB: test.optionB,
        optionC: test.optionC,
        optionD: test.optionD,
      });
    });

    res.json({ message: "Test created Successfully" });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "Internal Error",
      error: err.message,
    });
  }
}

async function getTests(req, res) {
  try {
    const output = await Test.getTests();

    res.json([...output]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getAvailableTests(req, res) {
  try {
    const output = await Test.getAvailableTests();

    res.json([...output]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getTestById(req, res) {
  try {
    const output = await Test.getTestById(req.params.id);

    if (!output[0])
      return res.status(400).json({ message: "No Test with the given Id" });

    res.json({ ...output[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function getTestByLesson(req, res) {
  try {
    const output = await Test.getTestByLesson(req.params.id);

    res.json([...output]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Error",
      error: err,
    });
  }
}

async function updateTest(req, res) {
  const testId = req.params.id;
  const question = req.body?.question;
  const optionA = req.body?.optionA;
  const optionB = req.body?.optionB;
  const optionC = req.body?.optionC;
  const optionD = req.body?.optionD;
  const answer = req.body?.answer;
  const type = req.body?.type;
  try {
    const output = await Test.updateTest({
      id: testId,
      question,
      answer,
      type,
      optionA,
      optionB,
      optionC,
      optionD,
    });

    if (!output[0]) return res.status(400).json({ message: "Invalid Id" });

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
  createTest,
  getTests,
  getTestById,
  getTestByLesson,
  updateTest,
  getAvailableTests,
};
