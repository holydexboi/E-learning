const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("lessons").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("e-learning")
            .createTable("lessons", function (table) {
              table.string("id").primary();
              table.string("name");
              table.string("course");
              table.foreign("course").references("id").inTable("courses");
              table.string("video");
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

async function createLesson(lesson) {
  try {
    const id = await knex("lessons").insert(lesson);

    return id;
  } catch (err) {
    throw new Error(err);
  }
}

async function getLessons() {
  try {
    const output = await knex("lessons")
      .select("id", "name", "video", "duration");

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getLessonsByCourse(courseId) {
  try {
    const output = await knex("lessons")
      .where({ course: courseId })
      .select("id", "name", "video", "duration");

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getLessonsById(id) {
  try {
    const output = await knex("lessons")
      .where({ id })
      .select("id", "name", "video", "duration");

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateLesson(lesson) {
  try {
    const output = await knex("lessons")
      .where({ id: lesson.id })
      .select("id", "name", "course", "video", "duration");

    if (!output[0]) return output;

    const name = !lesson.nname ? output.name : instructor.nname;

    const course = !lesson.course ? output.course : lesson.course;

    const video = !lesson.video ? output.video : lesson.video;
    const duration = !lesson.duration ? output.duration : lesson.duration;
    const response = await knex("lessons").where("id", "=", lesson.id).update({
      name,
      course,
      video,
      duration,
    });
    console.log(response);
    return [
      {
        name,
        course,
        video,
        duration,
      },
    ];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createLesson,
  getLessons,
  getLessonsById,
  getLessonsByCourse,
  createTable,
  updateLesson,
};
