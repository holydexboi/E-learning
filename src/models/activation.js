const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("activations").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("e-learning")
            .createTable("activations", function (table) {
              table.string("id").primary();
              table.string("code");
              table.boolean("valid").defaultTo(true);
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

async function generateCode(newCode) {
  try {
    const output = await knex("activations").insert(newCode);

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getActivationCode() {
  try {
    const code = await knex("activations").select();
    return code;
  } catch (err) {
    throw new Error(err);
  }
}

async function activateUser(code) {
  try {
    const output = await knex("activations")
      .where({ code })
      .select();

    if (output.length === 0 || output[0].valid === 0) return output;

    const check = await knex("activations").where({id: output[0].id}).update({valid: false})
    console.log(check)
    return output
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { generateCode, createTable, getActivationCode, activateUser };
