import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification />
        <LoginForm user={user} setUser={setUser} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user.name} logged in
      <button type="click" onClick={handleLogout}>
        log out
      </button>
      <BlogForm blogs={blogs} setBlogs={setBlogs} user={user} />
      <BlogList blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

export default App
