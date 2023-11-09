const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("grades").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("e-learning")
            .createTable("grades", function (table) {
              table.string("id").primary();
              table.string("level");
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

async function createGrade(grade) {
  try {
    const id = await knex("grades").insert(grade);

    return id;
  } catch (err) {
    throw new Error(err);
  }
}

async function getGrades() {
  try {
    const output = await knex("grades")
      .select("id", "level");

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getGradeById(id) {
  try {
    const output = await knex("grades").where({ id: id }).select("id", "level");

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateGrade(grade) {
  const output = await knex("grades")
    .where({ id: grade.id })
    .select("id", "level");

  if (!output[0]) return output;

  const response = await knex("grades").where("id", "=", grade.id).update({
    level: grade.level,
  });

  return [{ id: grade.id, level: grade.level }];
}

module.exports = {
  createTable,
  createGrade,
  updateGrade,
  getGradeById,
  getGrades,
};
