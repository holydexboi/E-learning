const knex = require("../knexfile");

async function createTable() {
  try {
    await knex.schema.hasTable("users").then(function (exists) {
      if (!exists) {
        async function create() {
          await knex.schema
            .withSchema("elearning")
            .createTable("users", function (table) {
              table.string("id").primary();
              table.string("userId");
              table.unique("userId");
              table.string("password");
              table.string("code");
              table.boolean("verify").defaultTo(false);
              table.string("firstName");
              table.string("lastName");
              table.string("location");
              table.boolean("isAdmin");
              table.string("email");
              table.enu("gender", ["male", "female"]);
              table.date("dob", { precision: 6 });
              table.string("grade");
              table.foreign("grade").references("id").inTable("grades");
              table.string("profilePic");
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

async function createUser(user) {
  try {
    const id = await knex("users").insert(user);

    return id;
  } catch (err) {
    throw new Error(err);
  }
}

async function createAdmin(user) {
  try {
    const id = await knex("users").insert(user);

    return id;
  } catch (err) {
    throw new Error(err);
  }
}

async function signin(user) {
  try {
    const output = await knex("users")
      .where({ userId: user.userId })
      .select(
        "id",
        "userId",
        "firstName",
        "lastName",
        "password",
        "gender",
        "grade",
        "isAdmin",
        "location",
        "profilePic",
        "dob"
      );

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function signinAdmin(user) {
  try {
    const output = await knex("users")
      .where({ email: user.email })
      .select(
        "id",
        "userId",
        "password",
        "firstName",
        "lastName",
        "gender",
        "grade",
        "isAdmin",
        "email",
        "location",
        "profilePic",
        "dob"
      );

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getStudents() {
  try {
    const output = await knex("users").select(
      "id",
      "userId",
      "password",
      "firstName",
      "lastName",
      "gender",
      "grade",
      "isAdmin",
      "email",
      "location",
      "profilePic",
      "dob"
    );

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function getStudentsCount() {
  try {
    const output = await knex("users").count().where({ isAdmin: 0 });

    return output;
  } catch (err) {
    throw new Error(err);
  }
}

async function update(user) {
  try {
    const output = await knex("users")
      .where({ userId: user.userId })
      .select(
        "id",
        "userId",
        "password",
        "firstName",
        "code",
        "lastName",
        "gender",
        "grade",
        "profilePic",
        "dob"
      );

    if (!output[0]) return output;
    console.log(output);
    const firstName = !user.firstName ? output[0].firstName : user.firstName;

    const lastName = !user.lastName ? output[0].lastName : user.lastName;

    const password = user.password === "" ? output[0].password : user.password;

    const code = user.code === "" ? output[0].code : user.code;

    const grade = !user.grade ? output.grade : user.grade;
    const profilePic = !user.profilePic ? output.profilePic : user.profilePic;
    const response = await knex("users")
      .where("userId", "=", user.userId)
      .update({
        firstName,
        lastName,
        password,
        code,
        verify: true,
        grade,
        profilePic,
      });
    console.log(response);
    return [{ firstName, lastName, password, grade, profilePic, code }];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  createTable,
  createUser,
  signin,
  update,
  createAdmin,
  signinAdmin,
  getStudents,
  getStudentsCount,
};
