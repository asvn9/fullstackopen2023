import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import {getAnecdotes, createAnecdotes, voteAnecdote} from './requests'
import {useReducer} from 'react'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type){
    case "ADD":
      return `you added ${action.content}`
    case "VOTE":
      return `you voted ${action.anecdote.content}`
    case "HIDE":
    return ''
    case "ERR":
      return 'Anecdote has to be at least 5 characters'
    default:
      return state
}
}


const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      notificationDispatch({type: "ERR"})
    }
  })

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })


  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
    notificationDispatch({type: "VOTE", anecdote})
    setTimeout(() => {
      notificationDispatch({type: "HIDE"})}, 5000
    )
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1
  })

    if(result.isLoading){
      return <div>loading data...</div>
    }

    if (result.isError) {
      return <span>anecdote server is not available due to problems in server</span>
    }

    const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContext.Provider value = {[notification, notificationDispatch]}>
        <Notification notification = {notification}/>
        <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />
      </NotificationContext.Provider>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
