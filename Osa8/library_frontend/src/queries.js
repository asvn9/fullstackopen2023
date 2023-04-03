import { gql } from '@apollo/client'

export const ALL_AUTHORS =  gql`
query {
  allAuthors {
    name 
    born
    bookCount
    id
  }
}`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {name
    id}
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author{name}
      published
      genres
    }
  }
`

export const GET_USER = gql `
query {
  me {
    username
    favoriteGenre
  }
}
`

export const BOOKS_BY_GENRE = gql`
  query findBookByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      author { name }
      published
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author{name}
      published
      genres
    }
    }
  
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born)  {
        name
        born
        id
    }
  }
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
${BOOK_DETAILS}
`