import { gql, useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE, GET_USER } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState("")
  const books = useQuery(ALL_BOOKS)
  const user =  useQuery(GET_USER)

  useEffect(() => {
    if (props.recommended && user.data) {
      setGenre(user.data.me.favoriteGenre);
    }
  }, [props.recommended, user.data]);

const {loading, error, data} = useQuery(BOOKS_BY_GENRE, {
variables: {genre},
fetchPolicy: "cache-and-network"

})
if (!user) {
  return <div>Loading...</div>
}
if (!data) {
  return <div>Loading...</div>
}

  if (!props.show) {
    return null
  }

  const genres = books.data.allBooks.map((book) => book.genres);
  const genreButtons = [...new Set(genres.flat())]
  
  let filteredBooks = data.allBooks;
  if (genre !== "") {
    filteredBooks = data.allBooks.filter((book) => book.genres.includes(genre));
  } else if (!genre && books.data) {
    filteredBooks = books.data.allBooks;
  }

  const handleGenreClick = (genre) => {
    setGenre(genre);
    props.setRecommended(false);
    props.setTitle('All books')
  };

  return (
    <div>
     {props.recommended==="true" ? <h2>Recommended books</h2> : <h2>{props.title}</h2>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
          ))}
        </tbody>
      </table>
      {genreButtons.map((genre) => (
        <button key={genre} onClick={() => handleGenreClick(genre)}>
          {genre}
        </button>
      ))}
     <button onClick = {() => setGenre('')}>All books</button>
    </div>
  )
}

export default Books
