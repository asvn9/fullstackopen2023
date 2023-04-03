import axios from 'axios'
import {useState} from 'react'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    const [error, setError] = useState(null);

    const getAll = async () => {
        try {
          const response = await axios.get(baseUrl)
          setResources(response.data)
        } catch (error) {
          setError(error.message)
        }
      }
  
    const create = async newObject => {
      const response = await axios.post(baseUrl, newObject)
      return response.data
    }
  
    return [
      resources, {create, getAll}, setResources
    ]
  }

  