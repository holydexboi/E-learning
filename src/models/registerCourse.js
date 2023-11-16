const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("usercourses").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("e-learning")
            .createTable("usercourses", function (table) {
              table.string("id").primary();
              table.string("user");
              table.foreign("subject").references("id").inTable("subjects");
              table.string("course");
              table.foreign("course").references("id").inTable("courses");
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

async function registerr(userCourse) {
  try {
    const id = await knex("usercourses").insert(userCourse);

    return id;
  } catch (err) {
    throw new Error(err);
  }
}

async function getRegisterCourse(userId) {
  try {
    const output = await knex("usercourses").where({ user: userId })
    .innerJoin("courses", "courses.course", "=", "courses.id")
    .select({
      id: "usercourses.id",
      user: "usercourses.user",
      courser_id: "usercourses.course",
      course_banner: "courses.banner",
      course_review: "courses.review",
      course_rate: "courses.rate"
    });

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function removeCourse(id) {
  const output = await knex("usercourses").where({ id }).select();

  if (!output[0]) return output;

  const response = await knex("usercourses")
    .where("id", "=", userCourse.id)
    .delete();

  return [output[0]];
}
