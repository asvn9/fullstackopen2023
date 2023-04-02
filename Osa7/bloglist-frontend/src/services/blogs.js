import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getUsers = () => {
  const req = axios.get('/api/users')
  return req.then((res) => res.data)
}

const getUserById = (id) => {
  const req = axios.get(`/api/users/${id}`)
  return req.then((res) => res.data)
}

const getBlogById = (id) => {
  const req = axios.get(`/api/blogs/${id}`)
  return req.then((res) => res.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getComments = async (id) => {
  const req = axios.get(`/api/blogs/comments/${id}`)
  return req.then((res) => res.data)
}

const postComments = async (id, content) => {
  const res = await axios.post(`/api/blogs/comments/${id}`, { content })
  return res.data
}

const addLikeToBlog = async (content) => {
  try {
    const updatedVotes = {
      ...content,
      likes: content.likes + 1
    }
    const response = await axios.put(
      `http://localhost:3003/api/blogs/${content.id}`,
      updatedVotes
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default {
  getAll,
  setToken,
  getUsers,
  getUserById,
  addLikeToBlog,
  getComments,
  postComments,
  getBlogById,
  create
}
