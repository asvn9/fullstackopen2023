import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import blogService from '../services/blogs'
import {Link} from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
      async function fetchUsers() {
        try {
          const users = await blogService.getUsers()
          setUsers(users)
        } catch (error) {
          console.log(error)
        }
      }
      fetchUsers()
    }, [])
    return (
      <div className="container">
        <h2>Users</h2>
        <Table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }

  export default Users