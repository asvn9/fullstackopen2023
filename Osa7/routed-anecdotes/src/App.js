import { useState } from 'react'
import Anecdote from './components/Anecdote'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'
import CreateNew from './services/CreateNewAnecdote'

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification}/>
      <Menu anecdotes = {anecdotes} CreateNew= {CreateNew} Anecdote = {Anecdote} addNew={addNew} notification={notification} setNotification={setNotification} />
      <Footer />
    </div>
  )
}

export default App
