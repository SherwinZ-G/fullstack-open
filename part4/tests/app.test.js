const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("api test for blog", () => {
    // test('notes are returned as json', async () => {
    //     await api
    //       .get('/api/blogs')
    //       .expect(200)
    //       .expect('Content-Type', /application\/json/)
    // })
    test("id is defined", async () => {
        const response = await api.get("/api/blogs");
        const blogs = response.body;
        blogs.forEach((blog) => {
            expect(blog._id).toBeDefined();
        });
    });
    test("blog is added", async () => {
        const newBlog = {
            title: 'a new blog',
            author: 'Jules',
            url: 'www.hhh.dd',
            likes: 2,
        };
        const initialBlogs = await api.get("/api/blogs");
        const initialBlogCount = initialBlogs.body.length;
        const response = await api.post("/api/blogs")
            .send(newBlog)
            .expect(201);
          
        // Get the updated count of blogs
        const updatedBlogs = await api.get('/api/blogs');
        const updatedBlogCount = updatedBlogs.body.length;

        // Ensure the total count of blogs increased by one
        expect(updatedBlogCount).toBe(initialBlogCount + 1);

    });
})

afterAll(() => {
  mongoose.connection.close();
});
