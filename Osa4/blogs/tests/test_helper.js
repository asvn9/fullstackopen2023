const Blog = require('../models/blog')
const User = require('../models/user')

const initBlogs = [
    {
        title: "Basics of backend testing",
        author: "Mr. Tester",
        url: "www.backendtest.com",
        likes: 54
    },
    {
        title: "Async/await 101",
        author: "Mr. Synchronous",
        url: "www.async.com",
        likes: 75
    }
]

const blogsInDB = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(u=> u.toJSON())
}

module.exports = {
    initBlogs, blogsInDB, usersInDb
}