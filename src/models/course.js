const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("courses").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("e_learning")
            .createTable("courses", function (table) {
              table.string("id").primary();
              table.string("subject");
              table.foreign("subject").references("id").inTable("subjects");
              table.string("grade");
              table.foreign("grade").references("id").inTable("grades");
              table.string("banner");
              table.integer("review").defaultTo(0);
              table.float("rate").defaultTo(0.0);
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

async function createCourse(course) {
  try {
    const id = await knex("courses").insert(course);

    return id;
  } catch (err) {
    throw new Error(err);
  }
}

async function getCourses() {
  try {
    const output = await knex("courses")
      .innerJoin("subjects", "courses.subject", "=", "subjects.id")
      .innerJoin("grades", "courses.grade", "=", "grades.id")
      .select({
        id: "courses.id",
        subject: "courses.subject",
        banner: "courses.banner",
        subject_title: "subjects.title",
        grade: "courses.grade",
        level: "grades.level",
        review: "courses.review",
        rate: "courses.rate",
      });

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getCourseById(id) {
  try {
    const output = await knex("courses")
      .where({ "courses.id":id })
      .innerJoin("subjects", "courses.subject", "=", "subjects.id")
      .innerJoin("grades", "courses.grade", "=", "grades.id")
      .select({
        id: "courses.id",
        subject: "courses.subject",
        subject_title: "subjects.title",
        banner: "courses.banner",
        grade: "courses.grade",
        level: "grades.level",
        review: "courses.review",
        rate: "courses.rate",
      });

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getCourseByGrade(id) {
  try {
    const output = await knex("courses")
      .where({ grade: id })
      .innerJoin("subjects", "courses.subject", "=", "subjects.id")
      .innerJoin("grades", "courses.grade", "=", "grades.id")
      .select({
        id: "courses.id",
        subject: "courses.subject",
        subject_title: "subjects.title",
        banner: "courses.banner",
        grade: "courses.grade",
        level: "grades.level",
        review: "courses.review",
        rate: "courses.rate",
      });

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateCourse(course) {
  try {
    const output = await knex("courses")
      .where({ id: course.id })
      .select("id", "subject", "grade", "banner");

    if (!output[0]) return output;

    const subject = !course.subject ? output.subject : course.subject;

    const grade = !course.grade ? output.grade : course.grade;
    const banner = !course.banner ? output.banner : course.banner;
    const response = await knex("courses").where("id", "=", course.id).update({
      subject,
      grade,
      banner,
    });
    
    return [{ subject, grade, banner }];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getCourseById,
  getCourses,
  updateCourse,
  createCourse,
  createTable,
  getCourseByGrade,
};
