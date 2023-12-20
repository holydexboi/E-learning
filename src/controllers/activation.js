const { nanoid } = require("nanoid");
const { v4 } = require("uuid");
const Activation = require("../models/activation");
const Users = require("../models/user");

Activation.createTable();

async function generateCode(req, res) {
  try {
    const activationId = v4();
    const activationCode = nanoid(6);
    const code = await Activation.generateCode({
      id: activationId,
      code: activationCode,
    });

    res.json({ message: "Activation code has been generated", activationCode });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Error",
    });
  }
}

async function getActivationCodes(req, res) {
  try {
    const codes = await Activation.getActivationCode();

    res.json({ data: codes });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Error",
    });
  }
}

async function activateUser(req, res) {
  if (!req.body.code)
    return res.status(400).json({ message: "Code not define" });
  const code = req.body.code;
  const userId = req.user._id
  try {
    const output = await Activation.activateUser(code);

    if (output.length === 0)
      return res.status(400).json({ message: "Invalid activation code" });
    if (output[0].valid === 0)
      return res.status(400).json({ message: "Activation code has been used" });
console.log(userId)
    const user = await Users.update({ userId, code });
    res.json({ data: output, message: "User has been activated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Error",
    });
  }
}

module.exports = { generateCode, getActivationCodes, activateUser };
