import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/BlogReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom'

import Blog from './components/Blog'
import Comments from './components/Comments'
import Users from './reducers/UserReducer'

const App = () => {
  const [blo, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const [userid, setUserid] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const Home = () => (
    <div className="container">
      <h2>blogs</h2>
      <BlogForm blogs={blo} setBlogs={setBlogs} user={user} />
      <BlogList setBlogs={setBlogs} />
    </div>
  )

  const SingleBlogs = () => {
    const id = useParams().id

    const blogs = useSelector((state) => state.blogs)
    const blog = blogs.find((blog) => blog.id === id)

    if (!blog) {
      return null
    }
    return (
      <div className="container">
        <h2>{blog.title}</h2>
        <Blog blog={blog} />
        <h3>Comments</h3>
        <Comments id={id} />
      </div>
    )
  }

  const UserBlogs = () => {
    useEffect(() => {
      setUserid(true)
    })

    const [users, setUsers] = useState()
    const id = useParams().id
    console.log(id)
    useEffect(() => {
      async function fetchUsers() {
        try {
          const users = await blogService.getUserById(id)
          setUsers(users)
        } catch (error) {
          console.log(error)
        }
      }
      fetchUsers()
    }, [])
    if (!users) {
      return null
    }
    return (
      <div className="container">
        <h2>{users.name}</h2>
        <h4>Added blogs</h4>
        <BlogList setBlogs={setBlogs} userid={userid} />
      </div>
    )
  }

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

  const padding = {
    padding: 5
  }
  return (
    <div className="container">
      <Notification />

      <Router>
        <Link style={padding} to="/">
          blogs{' '}
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <p>
          {user.name} logged in{' '}
          <button type="click" onClick={handleLogout}>
            log out
          </button>
        </p>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserBlogs />} />
          <Route path="/blogs/:id" element={<SingleBlogs />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
