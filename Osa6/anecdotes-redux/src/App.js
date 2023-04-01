import {useState} from 'react'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  let [showAll, setShowAll] = useState('')

  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter showAll={showAll} setShowAll={setShowAll} />
      <AnecdoteList showAll= {showAll}  />
      <AnecdoteForm/>
    </div>
  )
}

export default App