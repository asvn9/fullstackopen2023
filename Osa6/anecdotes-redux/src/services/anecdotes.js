import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {content, votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnecdote = async(content) => {
    try{
        const updatedVotes = {
            ...content,
            votes: content.votes +1
        }
        const response = await axios
            .put(`http://localhost:3001/anecdotes/${content.id}`, updatedVotes)
        return response.data
    } catch (error){
        console.log(error)
    }
}

export default {getAll, createNew, voteAnecdote}