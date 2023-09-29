require("dotenv").config();
const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const http = require("http");

const loginRouter = require('./controllers/login');

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('connect to mongodb')
  })
  .catch(err => {
    logger.error('error connecting to mongodb')
  });

// ...
app.use(cors());
app.use(express.json()); 

app.use('/api/login', loginRouter); // '/api/login' 是登录路由的基本路径
app.use("/api/blogs", blogsRouter);

module.exports = app;