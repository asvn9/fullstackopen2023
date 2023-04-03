import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import About from './About'

const Menu = ({anecdotes, CreateNew, Anecdote, addNew, setNotification}, notification) => {

    const padding = {
      paddingRight: 5
    }
    
    return (
      <Router>
      <div>
        <Link style={padding} to="/anecdotes">anecdotes</Link>
        <Link style={padding} to="/create">Create new</Link>
        <Link style={padding} to="/about">About</Link>
      <Routes>
        <Route path="/anecdotes" element = {<AnecdoteList anecdotes ={anecdotes} />} />
        <Route path="/create" element = {<CreateNew addNew = {addNew} anecdotes={anecdotes} notification={notification} setNotification={setNotification}/>} />
        <Route path="/about" element = {<About />} />
        <Route path="/anecdotes/:id" element = {<Anecdote anecdotes={anecdotes} />} />
      </Routes>
      </div>
          </Router>
    )
  }

  export default Menu