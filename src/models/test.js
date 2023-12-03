const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("tests").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("e-learning")
            .createTable("tests", function (table) {
              table.string("id").primary();
              table.string("question");
              table.string("optionA");
              table.string("optionB");
              table.string("optionC");
              table.string("optionD");
              table.string("answer");
              table.string("type");
              table.string("lesson");
              table.foreign("lesson").references("id").inTable("lessons");
              table.float("duration");
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

async function createTest(test) {
  try {
    const id = await knex("tests").insert(test);

    return id;
  } catch (err) {
    throw new Error(err);
  }
}

async function getTests() {
  try {
    
    const output = await knex("tests")
      .select(
        "id",
        "lesson",
        "question",
        "optionA",
        "optionB",
        "optionC",
        "optionD",
        "type",
        "duration"
      )

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getAvailableTests() {
  try {
    
    const output = await knex("tests")
    .innerJoin("lessons", "tests.lesson", "=", "lessons.id")
    .innerJoin("courses", "lessons.course", "=", "courses.id")
    .innerJoin("subjects", "subjects.id", "=", "courses.subject")
    .innerJoin("grades", "grades.id", "=", "courses.grade")
      .select({
        lesson:"tests.lesson",
        course: "lessons.course",
        topic: "lessons.name",
        grade: "grades.level",
        subject: "subjects.title"


  })
    .distinct('tests.lesson')

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getTestByLesson(lessonId) {
  try {
    const output = await knex("tests")
      .where({ lesson: lessonId })
      .select(
        "id",
        "lesson",
        "question",
        "optionA",
        "optionB",
        "optionC",
        "optionD",
        "type",
        "duration"
      )

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getTestById(id) {
  try {
    const output = await knex("tests")
      .where({ id })
      .select(
        "id",
        "lesson",
        "question",
        "optionA",
        "optionB",
        "optionC",
        "optionD",
        "answer",
        "type",
        "duration"
      );

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateTest(test) {
  try {
    const output = await knex("tests")
      .where({ id: test.id })
      .select(
        "id",
        "lesson",
        "question",
        "optionA",
        "optionB",
        "optionC",
        "optionD",
        "type",
        "duration"
      );

    if (!output[0]) return output;

    const question = !test.question ? output.question : test.question;

    const optionA = !test.optionA ? output.optionA : test.optionA;
    const optionB = !test.optionB ? output.optionB : test.optionB;
    const optionC = !test.optionC ? output.optionC : test.optionC;
    const optionD = !test.optionD ? output.optionD : test.optionD;
    const duration = !test.duration ? output.duration : test.duration;
    const type = !test.type ? output.type : test.type;
    const response = await knex("tests").where("id", "=", test.id).update({
      question,
      optionA,
      optionB,
      duration,
      optionC,
      optionD,
      type,
    });
    console.log(response);
    return [
      {
        question,
        optionA,
        optionB,
        duration,
        optionC,
        optionD,
        type,
      },
    ];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createTable,
  getTests,
  getTestByLesson,
  getTestById,
  updateTest,
  createTest,
  getAvailableTests
};
