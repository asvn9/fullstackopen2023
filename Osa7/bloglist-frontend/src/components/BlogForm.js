import { useState } from 'react'
import { useDispatch } from 'react-redux'
import CreateForm from './CreateForm'
import { setNotification } from '../reducers/NotificationReducer'
import { createBlog } from '../reducers/BlogReducer'

const BlogForm = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  const dispatch = useDispatch()

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(setNotification('You created ' + blogObject.title, 5))
    setLoginVisible(false)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <CreateForm createBlog={addBlog} />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default BlogForm
