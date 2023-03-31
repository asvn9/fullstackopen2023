import Blog from './Blog'
import axios from 'axios'

const BlogList = ({ blogs, setBlogs }) => {
  const handleView = (updatedBlog) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    )
    setBlogs(updatedBlogs)
  }

  const handleDeletion = (updatedBlog) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== updatedBlog.id)
    setBlogs(updatedBlogs)
  }

  const addLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await axios.put(`/api/blogs/${blog.id}`, updatedBlog)
    handleView(updatedBlog)
  }

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Blog
              blog={blog}
              handleView={handleView}
              handleDeletion={handleDeletion}
              handleLike={addLike}
            ></Blog>
          </div>
        ))}
    </div>
  )
}

export default BlogList
