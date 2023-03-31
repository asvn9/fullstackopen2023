const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})


blogRouter.delete('/:id', async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  const blogID = req.user.id

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  if (decodedToken.id !== blogID) {
    return res.status(401).json({ error: 'not authorized to delete' })
  }

  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})


blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (decodedToken.id !== user.id) {
    return res.status(401).json({ error: 'not authorized to post' })
  }


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})


blogRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blog = {
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then(updatedBlog => {
      res.json(updatedBlog)
    })
    .catch(error => {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'invalid or missing token' })
      }
      next(error)
    })
})

module.exports = blogRouter