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

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root, passwordHash' })

    await user.save()
})

test('blogs are in json format', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 4 blogs', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(2)
})

test('blog identifiers are named as id', async () => {
    const res = await api.get('/api/blogs')
    res.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('blog can be added', async () => {
    const user = {
        username: 'Jack23',
        name: 'Jack Johnson',
        password: 'salaisuus'
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const token = response.body.token

    const newBlog = {
        title: "How to use Supertest",
        author: "S. Test",
        url: "www.supertest.com",
        likes: 82
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    expect(res.body[2].title.toString()).toContain(
        "How to use Supertest")

})

test('blog cant be added without authorization', async () => {

    const token = "wrong token"

    const newBlog = {
        title: "How to use Supertest",
        author: "S. Test",
        url: "www.supertest.com",
        likes: 82
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(401)
})


test('a blog can be deleted', async () => {
    const user = {
        username: 'Jack',
        name: 'Jack Johnson',
        password: 'salaisuus'
    }

    await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const token = response.body.token
    const blogsStart = await helper.blogsInDB()
    const blogToDelete = blogsStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)

    const blogsEnd = await helper.blogsInDB()
    expect(blogsEnd).toHaveLength(
        helper.initBlogs.length - 1
    )
})

test('a blog can be updated', async () => {

    const n = await helper.blogsInDB()
    const blogToUpdate = n[0]
    const updatedLikes = { likes: blogToUpdate.likes + 1 }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedLikes)
        .expect(200)

    const newLikes = await helper.blogsInDB()
    expect(newLikes[0].likes).toBe(updatedLikes.likes)

})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root, passwordHash' })

        await user.save()
    })

    test('creation succeeds with a new username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'Jack',
            name: 'Jack Johnson',
            password: 'salaisuus'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

test('creation fails with a faulty username or password', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
        username: 'Ja',
        name: 'Jack Johnson',
        password: 'Sa'
    }

    const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('both username and password have to be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

afterAll(() => {
    mongoose.connection.close()
})