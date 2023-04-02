import { useState } from 'react'

const CreateForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')

  function handleBlogChange(event) {
    const value = event.target.value
    setNewBlog({ ...newBlog, [event.target.name]: value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id="title"
            placeholder="titlename"
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author
          <input
            id="author"
            placeholder="authorname"
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          url
          <input
            id="url"
            placeholder="urllink"
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateForm
