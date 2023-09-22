require('dotenv').config()
const config=require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const http = require('http')

app.use(cors())
app.use(express.json())


const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)


app.get('/api/blogs', (request, response) => {
    logger.info('mongo connect successful')
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    }).catch(error => {
      logger.error('Error fetching blogs:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    });
})

app.get('/npd', (req, res) => {
  res.send('ok cool it works')
})

app.post('/api/blogs', (request, response) => {

  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = app
// server.listen(config.PORT, () => {
//   console.log(`server is running on ${config.PORT}`)
// })