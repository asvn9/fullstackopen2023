import { useState } from "react"
import { useApolloClient, useSubscription } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import BornYear from "./components/BornYear"
import { BOOK_ADDED } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [recommended, setRecommended] = useState(false)
  const client = useApolloClient()
  const [title, setTitle] = useState("All books")

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      window.alert(`New book added`)
    },
  })

  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null
    }
    return <div style={{ color: "red" }}>{errorMessage}</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    if (newPage === "recommended") {
      setRecommended(true)
      setTitle("Recommended")
    } else {
      setRecommended(false)
      setTitle("All books")
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => handlePageChange("authors")}>authors</button>
        <button onClick={() => handlePageChange("books")}>books</button>
        <button onClick={() => handlePageChange("add")}>add book</button>
        <button onClick={() => handlePageChange("recommended")}>
          recommended
        </button>
        <button onClick={logout}>log out</button>
      </div>

      <Authors show={page === "authors"} />
      {page === "authors" && <BornYear />}
      <Books
        show={page === "books"}
        recommended={recommended}
        title={title}
        setRecommended={setRecommended}
        setTitle={setTitle}
      />
      <Books
        show={page === "recommended"}
        recommended={recommended}
        setRecommended={setRecommended}
        title={title}
        setTitle={setTitle}
      />
      <NewBook show={page === "add"} />
    </div>
  )
}

export default App
