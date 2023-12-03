const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("instructors").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("elearning")
            .createTable("instructors", function (table) {
              table.string("id").primary();
              table.string("firstName");
              table.string("lastName");
              table.string("profilePic");
              table.integer("review").defaultTo(0);
              table.enum("gender", ["male", "female"]);
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

async function createInstuctor(instructor) {
  try {
    const id = await knex("instructors").insert(instructor);

    return id;
  } catch (err) {
    throw new Error(err);
  }
}

async function getInstructorById(id) {
  try {
    const output = await knex("instructors")
      .where({ id })
      .select(
        "id",
        "firstName",
        "lastName",
        "gender",
        "rate",
        "profilePic",
        "review"
      );

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getInstructors() {
  try {
    const output = await knex("instructors").select(
      "id",
      "firstName",
      "lastName",
      "gender",
      "rate",
      "profilePic",
      "review"
    );

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateInstructor(instructor) {
  try {
    const output = await knex("instructors")
      .where({ id: instructor.id })
      .select(
        "id",
        "firstName",
        "lastName",
        "gender",
        "rate",
        "profilePic",
        "review"
      );

    if (!output[0]) return output;
    console.log(output);
    const firstName = !instructor.firstName
      ? output.firstName
      : instructor.firstName;

    const lastName = !instructor.lastName
      ? output.lastName
      : instructor.lastName;

    const profilePic = !instructor.profilePic
      ? output.profilePic
      : instructor.profilePic;
    const response = await knex("instructors")
      .where("id", "=", instructor.id)
      .update({
        firstName,
        lastName,
        profilePic,
      });
    console.log(response);
    return [{ firstName, lastName, profilePic }];
  } catch (err) {
    throw new Error(err);
  }
}

async function rateInstructor(instructor) {
  try {
    const output = await knex("instructors")
      .where({ id: instructor.id })
      .select(
        "id",
        "firstName",
        "lastName",
        "gender",
        "rate",
        "profilePic",
        "review"
      );

    if (!output[0]) return output;
    console.log(output[0]);
    console.log(instructor.rate + output[0].rate);

    const review = output[0].review + 1;
    const rate = (instructor.rate + output[0].rate) / review;
    const response = await knex("instructors")
      .where("id", "=", instructor.id)
      .update({
        rate,
        review,
      });
    console.log(response);
    return [{ rate, review}];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createTable,
  createInstuctor,
  updateInstructor,
  getInstructorById,
  getInstructors,
  rateInstructor,
};
