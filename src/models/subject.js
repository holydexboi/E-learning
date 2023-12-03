const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("subjects").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("elearning")
            .createTable("subjects", function (table) {
              table.string("id").primary();
              table.string("title");
              table.string("description");
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

async function createSubject(subject) {
  try {
    const id = await knex("subjects").insert(subject);

    return id;
  } catch (err) {
    throw new Error(err);
  }
}

async function getSubject() {
  try {
    const output = await knex("subjects").select("id", "title", "description");

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getSubjectById(id) {
  try {
    const output = await knex("subjects")
      .where({ id: id })
      .select("id", "title", "description");

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateSubject(subject) {
  const output = await knex("subjects")
    .where({ id: subject.id })
    .select("id", "title", "description");

  if (!output[0]) return output;

  const response = await knex("subjects").where("id", "=", subject.id).update({
    title: subject.title,
    description: subject.description,
  });

  return [
    { id: subject.id, title: subject.title, description: subject.description },
  ];
}

module.exports = {
  createTable,
  createSubject,
  updateSubject,
  getSubject,
  getSubjectById,
};
