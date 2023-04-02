const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initBlogs[1])
    await blogObject.save()
})

test('blogs are in json format', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 4 blogs', async ()=> {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(2)
})

test('blog identifiers are named as id', async() => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
})

test('blog can be added', async() => {
    const newBlog = {
        title: "How to use Supertest",
        author: "S. Test",
        url: "www.supertest.com",
        likes: 82
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(initBlogs.length + 1)
        expect(res.body[2].title.toString()).toContainEqual(
          "How to use Supertest")
 
})

test('a blog can be deleted', async () => {
    const blogsStart = await helper.blogsInDB()
    const blogToDelete = blogsStart[0]
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsEnd = await helper.blogsInDB()
    expect(blogsEnd).toHaveLength(
        helper.initBlogs.length-1
    )
})

test('a blog can be updated', async () => {
    const n = await helper.blogsInDB()
    const blogToUpdate = n[0]

    await api   
       .put(`/api/blogs/${blogToUpdate.id}`)
       .expect(200)

    const newLikes = await helper.blogsInDB()
    expect(newLikes[0].likes).toBe(n[0].likes)
})

describe('when there is initially one user at db', () => {
    beforeEach(async() => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({username: 'root, passwordHash'})

        await user.save()
    })

    test('creation succeeds with a new username', async() => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'Jack23',
            name: 'Jack Johnson',
            password: 'salaisuus'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1)

        const usernames = usersAtEnd.map(u=> u.username)
        expect(usernames).toContain(newUser.username)
    })
})

afterAll(() => {
    mongoose.connection.close()
})