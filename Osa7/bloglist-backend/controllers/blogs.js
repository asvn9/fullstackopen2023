const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name:1})

        response.json(blogs)
      })

      
  blogRouter.delete('/:id', async(req, res, next) => {
 
    const token = getTokenFrom(req)

    const decodedToken = jwt.verify(token, process.env.SECRET)

    const blog = await Blog.findById(req.params.id)
    const blogID = blog.user.id.toString('hex')
 console.log(blogID)
 console.log(decodedToken)
    if(!token || !decodedToken.id){
      return res.status(401).json({error: 'token missing or invalid'})
    }

  if(decodedToken.id !== blogID){ 
    return res.status(401).json({error: 'not authorized to delete'})}
  
    try{
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    } catch (exception){
        next(exception)
  }
  })



  
  blogRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
 
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
    try{
      const blog = await Blog.findById(req.params.id)
      if (blog){
        res.json(blog)
      } else {
        res.status(404).end()
      }
    }catch(exception){
      next(exception)
    }
  })


  blogRouter.put('/:id', (req, res, next) => {
    const body = req.body
    const blog = {
      likes: body.likes
    }

    Blog.findByIdAndUpdate(req.params.id, blog, {new:true})
      .then(updatedBlog => {
        res.json(updatedBlog)
      })
      .catch(error => next(error))
  })

  blogRouter.get('/comments/:id', async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id)
      const comments = blog.comments
      res.json(comments)
    } catch (exception) {
      next(exception)
    }
  })

  blogRouter.delete('/comments/:id', async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id)
      blog.comments = []
      const updatedBlog = await blog.save()
      res.json(updatedBlog.comments)
    } catch (exception) {
      next(exception)
    }
  })

  blogRouter.post('/comments/:id', async (req, res, next) => {
    const  text = req.body.content
    try {
      const blog = await Blog.findById(req.params.id)
      blog.comments.push( text)
      const updatedBlog = await blog.save()
      res.json(updatedBlog.comments)
    } catch (exception) {
      next(exception)
    }
  })

  module.exports = blogRouter