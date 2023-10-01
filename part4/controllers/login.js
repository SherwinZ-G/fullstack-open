const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });
  const textEncoder = new TextEncoder();
  const userLength = textEncoder.encode(username);
  const pwdLength = textEncoder.encode(password);

  if (userLength.length <= 3 || pwdLength<=3) {
    return response.status(400).json({error:"用户名长度太短"})
  } else {
      const savedUser = await user.save();
      response.status(201).json(savedUser);
  }

});

module.exports = loginRouter;
