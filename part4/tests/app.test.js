const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('api test for blog', () => {
    test('notes are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(201)
          .expect('Content-Type', /application\/json/)
      })
})


afterAll(() => {
  mongoose.connection.close()
})