import {useNavigate } from 'react-router-dom'
import {useField} from '../hooks'


const CreateNew = ({addNew, setNotification},notification) => {
    const navigate = useNavigate()
    const content = useField('text')
    const { clear: clearContent, ...newContent } = content
    const author = useField('text')
    const { clear: clearAuthor, ...newAuthor } = author
    const info = useField('text')
    const { clear: clearInfo, ...newInfo } = info

    const handleReset = event => {
      content.clear()
      author.clear()
      info.clear()
    }


    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })

      navigate("/anecdotes")
      setNotification(`a new anecdote ${content.value} was created!`)

    }
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...newContent} />
          </div>
          <div>
            author
            <input {...newAuthor} />
          </div>
          <div>
            url for more info
            <input {...newInfo} />
          </div>
          <button>create</button>
        </form>
        <button onClick = {handleReset} >reset</button>
      </div>
    )
  }

  export default CreateNew