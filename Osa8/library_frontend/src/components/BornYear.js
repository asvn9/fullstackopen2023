import { gql, useQuery } from '@apollo/client'
import {useState} from 'react'
import {useMutation} from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR } from '../queries'

const allAuthors =  gql`
query {
  allAuthors {
    name 
  }
}`

const BornYear = () => {
    const [name, setName] = useState(null)
    const [born, setBorn] = useState('')
    const authors = useQuery(allAuthors)

    const [changeYear] = useMutation(EDIT_AUTHOR)

    const options = authors.data.allAuthors.map(function(row){
        return {value: row.name, label: row.name}
    })

    const submit = async (event) => {
        console.log(name)
        event.preventDefault()
        changeYear({variables: {name:name.value, born}})
        setName('')
        setBorn('')
    }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
    <Select defaultValue={name} onChange={setName}
    options={options} />
     <div>born <input
     value={born} onChange= {({target}) => setBorn(parseInt(target.value))}></input></div> 
     <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default BornYear