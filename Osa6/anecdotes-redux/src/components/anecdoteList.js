import { useDispatch, useSelector } from 'react-redux'
import {upvote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = ({showAll}) => {
  const dispatch = useDispatch()
  const anecdotes =  useSelector(state => state.anecdotes)
    const state = useSelector(state => state)
    let anec2 = [...anecdotes]
  
    if (state.filter === 'NON'){
       anec2 = anecdotes.filter(anecdote => anecdote.content.includes(showAll))
    } 

    const vote = (anecdote) => {
        dispatch(upvote(anecdote))
        dispatch(setNotification('you voted ' + anecdote.content, 5))
      }
      
    return(
        <div>
        {anec2.sort((a,b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
}

export default AnecdoteList