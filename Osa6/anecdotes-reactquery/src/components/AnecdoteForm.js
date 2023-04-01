import {useContext} from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = ({newAnecdoteMutation}) => {

  const [notification, NotificationDispatch] = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    NotificationDispatch({type: "ADD", content})
    setTimeout(() => {
    NotificationDispatch({type: "HIDE"})}, 5000
    )
  
    }


  return (
    <div>
      <h3>create new anecdote</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
