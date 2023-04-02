import axios from 'axios'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { upvote, deleteBlog } from '../reducers/BlogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = (blog) => {
    dispatch(upvote(blog))
  }

  const handleDeletion = async () => {
    const updatedBlog = { ...blog }
    const user = JSON.parse(localStorage.getItem('loggedBlogUser'))
    const token = user.token
    const config = { headers: { Authorization: `bearer ${token}` } }
    if (
      window.confirm(`Do you really want to delete blog ${blog.title}?`) ===
      true
    ) {
      await axios.delete(`/api/blogs/${blog.id}`, config, updatedBlog)
      dispatch(deleteBlog(blog))
    }
  }

  const loggedBlogUser = JSON.parse(localStorage.getItem('loggedBlogUser'))

  return (
    <span className="blog">
      {blog.title}
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}{' '}
        <button onClick={() => handleLike(blog)}>like</button>
        {blog.user && <div>{blog.user.name}</div>}
      </div>
      {loggedBlogUser && loggedBlogUser.username === blog.user.username && (
        <div>
          <button onClick={handleDeletion}>remove</button>
        </div>
      )}
    </span>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
