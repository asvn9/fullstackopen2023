import { useState, useEffect } from 'react'
import {useResource} from './hooks/useResource'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')
  const [notes, noteService, setNotes] = useResource('http://localhost:3005/notes')

  useEffect(() => {
    noteService.getAll()
  }, [])

  const [persons, personService, setPersons] = useResource('http://localhost:3005/persons')


  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    const newNote = { content: content.value }
    const createdNote = await noteService.create(newNote)
    setNotes([...notes, createdNote])
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    const newPerson =({ name: name.value, number: number.value})
    const createdPerson = await personService.create(newPerson)
    setPersons([...persons, createdPerson])
  }

  useEffect(() => {
   personService.getAll()
  }, [])

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App