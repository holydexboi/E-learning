const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("courses").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("e-learning")
            .createTable("courses", function (table) {
              table.string("id").primary();
              table.string("subject");
              table.foreign("subject").references("id").inTable("subjects");
              table.string("grade");
              table.foreign("grade").references("id").inTable("grades");
              table.string("instructor");
              table.string("banner");
              table
                .foreign("instructor")
                .references("id")
                .inTable("instructors");
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
      .innerJoin("instructors", "courses.instructor", "=", "instructors.id")
      .select({
        id: "courses.id",
        subject: "courses.subject",
        banner: "courses.banner",
        subject_title: "subjects.title",
        grade: "courses.grade",
        level: "grades.level",
        instructor: "courses.instructor",
        instructor_firstName: "instructors.firstName",
        instructor_lastName: "instructors.lastName",
        instructor_rate: "instructors.rate",
        instructor_review: "instructors.review",
        instructor_profilePic: "instructors.profilePic",
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
      .innerJoin("instructors", "courses.instructor", "=", "instructors.id")
      .select({
        id: "courses.id",
        subject: "courses.subject",
        subject_title: "subjects.title",
        banner: "courses.banner",
        grade: "courses.grade",
        level: "grades.level",
        instructor: "courses.instructor",
        instructor_firstName: "instructors.firstName",
        instructor_lastName: "instructors.lastName",
        instructor_rate: "instructors.rate",
        instructor_review: "instructors.review",
        instructor_profilePic: "instructors.profilePic",
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
      .innerJoin("instructors", "courses.instructor", "=", "instructors.id")
      .select({
        id: "courses.id",
        subject: "courses.subject",
        subject_title: "subjects.title",
        banner: "courses.banner",
        grade: "courses.grade",
        level: "grades.level",
        instructor: "courses.instructor",
        instructor_firstName: "instructors.firstName",
        instructor_lastName: "instructors.lastName",
        instructor_rate: "instructors.rate",
        instructor_review: "instructors.review",
        instructor_profilePic: "instructors.profilePic",
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
      .select("id", "subject", "grade", "instructor", "banner");

    if (!output[0]) return output;

    const subject = !course.subject ? output.subject : instructor.subject;

    const grade = !course.grade ? output.grade : course.grade;

    const instructor = !course.instructor
      ? output.instructor
      : course.instructor;
    const banner = !course.banner ? output.banner : course.banner;
    const response = await knex("courses").where("id", "=", course.id).update({
      subject,
      grade,
      instructor,
      banner,
    });
    console.log(response);
    return [{ subject, grade, instructor, banner }];
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
