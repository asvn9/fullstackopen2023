import Togglable from './Togglable'
import axios from 'axios'
import PropTypes from 'prop-types'

const Blog =  ({ blog, handleDeletion, handleLike }) => {

  const deleteBlog = async () => {
    const updatedBlog = { ...blog }
    const user = JSON.parse(localStorage.getItem('loggedBlogUser'))
    const token = user.token
    const config= { headers: { Authorization: `bearer ${token}` } }
    if(window.confirm(`Do you really want to delete blog ${blog.title}?`)===true){
      await axios.delete(`/api/blogs/${blog.id}`, config, updatedBlog)
      handleDeletion(updatedBlog)}
  }

  const loggedBlogUser =  JSON.parse(localStorage.getItem('loggedBlogUser'))
  console.log(blog)

  return(
    <span className='blog'>
      {blog.title} {blog.author} <Togglable buttonLabel= "view" id ="view-button">
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button placeholder='lbutton' onClick={() => handleLike(blog)}>like</button></div>
        {blog.user && <div>{blog.user.name}</div>}
        {loggedBlogUser && loggedBlogUser.username ===blog.user.username &&
        <div><button onClick={deleteBlog}>remove</button></div>
        }
      </Togglable>
    </span>  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,

}

export default Blog