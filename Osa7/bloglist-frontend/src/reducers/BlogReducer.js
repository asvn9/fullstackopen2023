import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    likeABlog(state, action) {
      const id = action.payload.id
      const blogToLike = state.find((n) => n.id === id)
      if (!blogToLike) {
        return state
      }

      const par = JSON.parse(JSON.stringify(blogToLike))
      console.log(par)
      const changedBlog = {
        ...par,
        likes: par.likes + 1
      }
      const likedBlog = state.map((ane) => (ane.id !== id ? ane : changedBlog))
      return likedBlog
    },
    deleteBlog(state, action) {
      const id = action.payload.id
      const blogToDelete = state.find((n) => n.id === id)
      const updatedBlogs = state.filter((blog) => blog.id !== blogToDelete.id)
      return updatedBlogs
    }
  }
})

export const { appendBlog, setBlogs, likeABlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const upvote = (content) => {
  return async (dispatch) => {
    const updated = await blogService.addLikeToBlog(content)
    dispatch(likeABlog(updated))
  }
}

export default blogSlice.reducer
