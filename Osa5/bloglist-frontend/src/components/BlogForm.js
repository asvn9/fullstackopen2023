import { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import CreateForm from './CreateForm'
import { setNotification } from '../reducers/NotificationReducer'

const BlogForm = ({ blogs, setBlogs, user }) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  const dispatch = useDispatch()

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat({ ...returnedBlog, user }))
        console.log(returnedBlog)
      })
      .then(() => {
        dispatch(setNotification(`Added a new blog  ${blogObject.title}`, 5))
      })
    setLoginVisible(false)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="login-button" onClick={() => setLoginVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <CreateForm createBlog={addBlog} />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default BlogForm
