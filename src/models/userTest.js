const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("usertests").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("elearning")
            .createTable("usertests", function (table) {
              table.string("id").primary();
              table.string("user");
              table.foreign("user").references("userId").inTable("users");
              table.string("lesson");
              table.string("tests");
              table.foreign("lesson").references("lesson").inTable("tests");
              table.float("score");
              table.enu("status", ["inprogress", "completed"]);
              table
                .timestamp("created_at", { precision: 6 })
                .defaultTo(knex.fn.now(6));
            });
        }
        create();
      }
    });
  } catch (e) {
    console.error(e);
  }
}

async function takeTest(userTest) {
  try {
    const id = await knex("usertests").insert(userTest);

    const output = await knex("tests")
      .where({ lesson: userTest.lesson })
      .select(
        "question",
        "type",
        "id",
        "optionA",
        "optionB",
        "optionC",
        "optionD"
      );

    return { user_testId: userTest.id, test: [...output] };
  } catch (err) {
    throw new Error(err);
  }
}

async function getUserTest(userId) {
  try {
    const output = await knex("usertests")
      .innerJoin("lessons", "usertests.lesson", "=", "lessons.id")
      .innerJoin("courses", "lessons.course", "=", "courses.id")
      .innerJoin("subjects", "subjects.id", "=", "courses.subject")
      .innerJoin("grades", "grades.id", "=", "courses.grade")
      .where({user: userId})
      .select({
        id: "usertests.id",
        user: "usertests.user",
        lesson: "usertests.lesson",
        status: "usertests.status",
        score: "usertests.score",
        course: "lessons.course",
        topic: "lessons.name",
        grade: "grades.level",
        subject: "subjects.title",
      })
      .distinct("usertests.lesson");

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateTest(userTest) {
  try {
    const output = await knex("usertests")
      .where({ id: userTest.id })
      .select("id", "user", "lesson", "status", "score", "tests");

    if (!output[0]) return output;
    let testArray = output[0].tests.split(",");
    const lessonTest = await knex("tests")
      .where({ id: userTest.testId })
      .select("id", "answer");

    const check = testArray.includes(userTest.testId);

    let newTest = "";
    if (!check) {
      newTest =
        output[0].tests !== ""
          ? output[0].tests + "," + userTest.testId.trim()
          : userTest.testId.trim();

         
      testArray = newTest.split(",");
      console.log(testArray.length)

      console.log(lessonTest.length)
      let score =
        lessonTest[0].answer === userTest.answer
          ? output[0].score + 1
          : output[0].score;
      let status =
      testArray.length >=  lessonTest.length ? "completed" : "inprogress";
      const response = await knex("usertests")
        .where("id", "=", output[0].id)
        .update({
          score,
          status,
          tests: newTest 
        });

      return [{ score, status }];
    }

    return [{ ...output[0].score }];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createTable,
  takeTest,
  getUserTest,
  updateTest,
};
