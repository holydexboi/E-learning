const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("lessons").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("e_learning")
            .createTable("lessons", function (table) {
              table.string("id").primary();
              table.string("name");
              table.string("course");
              table.string("description");
              table.string("instructorName");
              table.string("instructorPic");
              table.foreign("course").references("id").inTable("courses");
              table.string("video");
              table.string("doc");
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
      .innerJoin("courses", "lessons.course", "=", "courses.id")
      .innerJoin("subjects", "subjects.id", "=", "courses.subject")
      .innerJoin("grades", "grades.id", "=", "courses.grade")
      .select({
        id: "lessons.id",
        name: "lessons.name",
        video: "lessons.video",
        duration: "lessons.duration",
        doc: "lessons.doc",
        course: "lessons.course",
        instructorName: "lessons.instructorName",
        description: "lessons.description",
        instructorPic: "lessons.instructorPic",
        subject: "subjects.title",
        grade: "grades.level",
      });

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getLessonsByCourse(courseId) {
  try {
    const output = await knex("lessons")
      .where({ course: courseId })
      .innerJoin("courses", "lessons.course", "=", "courses.id")
      .innerJoin("subjects", "subjects.id", "=", "courses.subject")
      .innerJoin("grades", "grades.id", "=", "courses.grade")
      .select({
        id: "lessons.id",
        name: "lessons.name",
        video: "lessons.video",
        doc: "lessons.doc",
        duration: "lessons.duration",
        course: "lessons.course",
        instructorName: "lessons.instructorName",
        description: "lessons.description",
        instructorPic: "lessons.instructorPic",
        subject: "subjects.title",
        grade: "grades.level",
      });

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getLessonsById(id) {
  try {
    const output = await knex("lessons")
      .where({ id })
      .innerJoin("courses", "lessons.course", "=", "courses.id")
      .innerJoin("subjects", "subjects.id", "=", "courses.subject")
      .innerJoin("grades", "grades.id", "=", "courses.grade")
      .select({
        id: "lessons.id",
        name: "lessons.name",
        video: "lessons.video",
        duration: "lessons.duration",
        doc: "lessons.doc",
        instructorName: "lessons.instructorName",
        course: "lessons.course",
        description: "lessons.description",
        instructorPic: "lessons.instructorPic",
        subject: "subjects.title",
        grade: "grades.level",
      });

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateLesson(lesson) {
  try {
    const output = await knex("lessons")
      .where({ id: lesson.id })
      .innerJoin("courses", "lessons.course", "=", "courses.id")
      .innerJoin("subjects", "subjects.id", "=", "courses.subject")
      .innerJoin("grades", "grades.id", "=", "courses.grade")
      .select({
        id: "lessons.id",
        name: "lessons.name",
        video: "lessons.video",
        doc: "lessons.doc",
        duration: "lessons.duration",
        instructorName: "lessons.instructorName",
        description: "lessons.description",
        instructorPic: "lessons.instructorPic",
        subject: "subjects.title",
        grade: "grades.level",
      });

    if (!output[0]) return output;

    const name = !lesson.name ? output[0].name : lesson.name;

    const course = !lesson.course ? output[0].course : lesson.course;

    const video = !lesson.video ? output[0].video : lesson.video;
    const doc = !lesson.doc ? output[0].doc : lesson.doc;
    const duration = !lesson.duration ? output[0].duration : lesson.duration;
    const instructorName = !lesson.instructorName
      ? output[0].instructorName
      : lesson.instructorName;
    const description = !lesson.description
      ? output[0].description
      : lesson.description;
    const instructorPic = !lesson.instructorPic
      ? output[0].instructorPic
      : lesson.instructorPic;
    const response = await knex("lessons").where("id", "=", lesson.id).update({
      name,
      course,
      video,
      doc,
      duration,
      description,
      instructorName,
      instructorPic,
    });
    console.log(response);
    return [
      {
        name,
        course,
        video,
        duration,
        doc,
        description,
        instructorName,
        instructorPic,
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
