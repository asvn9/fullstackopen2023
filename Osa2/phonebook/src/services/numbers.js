import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

    const getAll = () => {
        return axios.get(baseUrl)
    }

    const create = newObject => {
        return axios.post(baseUrl, newObject)
    }

    const update = (id) => {
        return axios.delete(`${baseUrl}/${id}`)
    }

    const repla = (id, newObject) => {
        return axios.put(`${baseUrl}/${id}`, newObject)
      }

    export default {
        getAll: getAll,
        create: create,
        update: update,
        repla: repla
    }