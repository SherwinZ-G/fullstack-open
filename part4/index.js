require('dotenv')
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')

const server = http.createServer(app)
server.listen(config.PORT, () => {
  logger.info(`server is running on ${config.PORT}`)
})