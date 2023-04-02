import blogService from '../services/blogs'
import { useState, useEffect } from 'react'

const Comments = ({ id }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    async function fetchComments() {
      try {
        const comments = await blogService.getComments(id)
        setComments(comments)
      } catch (error) {
        console.log(error)
      }
    }
    fetchComments()
  }, [])

  function handleChange(event) {
    const value = event.target.value
    setNewComment(value)
  }

  async function createComment() {
    try {
      const comment = await blogService.postComments(id, newComment)
      setComments([...comments, newComment])
      console.log(comment)
      setNewComment('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <input value={newComment} onChange={handleChange}></input>
      <button onClick={createComment}>Comment</button>
      {comments.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))}
    </div>
  )
}

export default Comments
