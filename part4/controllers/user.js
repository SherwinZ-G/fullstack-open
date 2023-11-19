const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
    const textEncoder = new TextEncoder();
    const userLength = textEncoder.encode(body.username);
    const pwdLength = textEncoder.encode(body.password);

    if (userLength.length <= 3 || pwdLength <= 3) {
      return response.status(400).json({ error: "用户名长度太短" });
    } else {
      const savedUser = await user.save();
      response.status(201).json(savedUser);
    }

});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { user: 0, likes: 0 });
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.get("/:userId/blogs", async (request, response) => {
  const userId = request.params.userId; // 从路由参数中获取userId
  const user = await User.findById(userId).populate("blogs", {
    user: 0,
    likes: 0,
  });

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  response.json(user.blogs.map((blog) => blog.toJSON()));
});

module.exports = usersRouter;
