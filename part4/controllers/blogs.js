const blogsRouter = require('express').Router()
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => {
      logger.error("Error fetching blogs:", error);
      response.status(500).json({ error: "Internal Server Error" });
    });
});


blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);
  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogsRouter.delete("/:id", (request, response) => {
  const id = String(request.params.id);
  //mongoose自带的remove方法
  Blog.findByIdAndRemove(id)
    .then(() => {
      logger.info(`Deleted blog with ID: ${id}`);
      response.status(204).end(); // 204表示成功处理，但不返回任何内容
    })
    .catch((error) => {
      logger.error("Error deleting blog:", error);
      response.status(500).json({ error: "Internal Server Error" });
    });
});

blogsRouter.patch("/:id", async (request, response) => {
  const id = request.params.id;
  const updateData = request.body;

  // 使用 Mongoose 的 findByIdAndUpdate 方法来更新指定 ID 的博客
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes: updateData.likes },
      { new: true }
    );
    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    logger.error("Error updating blog:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = blogsRouter;