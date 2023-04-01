import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action){
      state.push(action.payload)
      
    },
    addVote(state, action){
      const id = action.payload.id
      const anecdoteToVote = state.find(n => n.id === id)
      const changedDote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes +1
      }
      return state.map(ane =>
        ane.id !== id ? ane : changedDote)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }

})


export const {addVote, appendAnecdote, setAnecdotes} = anecSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const upvote = content => {
  return async dispatch => {
    const updated = await anecdoteService.voteAnecdote(content)
    dispatch(addVote(updated))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecSlice.reducer