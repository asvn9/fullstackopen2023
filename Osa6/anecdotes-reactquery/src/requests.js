import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
   return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdotes = newNote => {
   return axios.post(baseUrl, newNote).then(res => res.data)
}

export const voteAnecdote = (anec) => {
    const updatedVotes = {
        ...anec,
        votes: anec.votes +1}
        return axios.put(`http://localhost:3001/anecdotes/${anec.id}`, updatedVotes)
}