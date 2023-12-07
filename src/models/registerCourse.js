const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("usercourses").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("elearning")
            .createTable("usercourses", function (table) {
              table.string("id").primary();
              table.string("user");
              table.foreign("user").references("userId").inTable("users");
              table.string("course");
              table.foreign("course").references("id").inTable("courses");
              table.string("lessons");
              table.enu("status", ["inprogress", "completed"]);
              table.integer("progress");
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

async function register(userCourse) {
  try {
    const id = await knex("usercourses").insert(userCourse);

    return id;
  } catch (err) {
    throw new Error(err);
  }
}

async function getRegisterCourse(userId) {
  try {
    const output = await knex("usercourses")
      .where({ user: userId })
      .innerJoin("courses", "usercourses.course", "=", "courses.id")
      .select({
        id: "usercourses.id",
        user: "usercourses.user",
        courser_id: "usercourses.course",
        course_banner: "courses.banner",
        course_review: "courses.review",
        course_rate: "courses.rate",
      });

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getUserPerCourseCount() {
  try {
    const output = await knex("usercourses")
      .innerJoin("courses", "usercourses.course", "=", "courses.id")
      .innerJoin("subjects", "courses.subject", "=", "subjects.id")
      .innerJoin("grades", "courses.grade", "=", "grades.id")
      .select({
        courser_id: "usercourses.course",
        subject: "subjects.title",
        grade: "grades.level"
      })
      .count('user')
      .groupBy('course')

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function removeCourse(id) {
  const output = await knex("usercourses").where({ id }).select();

  if (!output[0]) return output;

  const response = await knex("usercourses").where("id", "=", id).delete();

  return [output[0]];
}

async function updateProgress(userCourse) {
  try {
    const output = await knex("usercourses")
      .where({ user: userCourse.user, course: userCourse.course })
      .select("id", "user", "course", "progress", "lessons", "status");

    if (!output[0]) return output;
    console.log("lesson", output[0].lessons);
    let lessonArray = output[0].lessons.split(",");
    const courseLessons = await knex("lessons")
      .where({ course: userCourse.course })
      .select("id");

    const check = lessonArray.includes(userCourse.lessonId);

    let newLesson = "";
    if (!check) {
      newLesson =
        output[0].lessons !== ""
          ? output[0].lessons + "," + userCourse.lessonId.trim()
          : userCourse.lessonId.trim();
      lessonArray = newLesson.split(",");

      const lessonArrayLength =
        lessonArray.length <= 1 ? 1 : lessonArray.length;
      const progress = Math.round(
        (lessonArrayLength / courseLessons.length) * 100
      );

      console.log(courseLessons.length);

      const response = await knex("usercourses")
        .where("id", "=", output[0].id)
        .update({
          progress,
          lessons: newLesson,
        });

      return [{ progress }];
    }
    console.log("lesson", output[0]);
    return [{ ...output[0].progress }];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createTable,
  register,
  getRegisterCourse,
  removeCourse,
  updateProgress,
  getUserPerCourseCount
};
