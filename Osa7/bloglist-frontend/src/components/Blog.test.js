import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateForm from './CreateForm'

test('<CreateForm /> return the function with correct data', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<CreateForm createBlog={createBlog} />)

  const input = screen.getByPlaceholderText('titlename')
  await user.type(input, 'testing a form')

  const input2 = screen.getByPlaceholderText('authorname')
  await user.type(input2, 'mr tester')

  const input3 = screen.getByPlaceholderText('urllink')
  await user.type(input3, 'www.url.fi')
  const sendButton = screen.getByText('create')
  await user.click(sendButton)

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'testing a form',
    author: 'mr tester',
    url: 'www.url.fi'
  })
})

test('clicking view shows url and likes', async () => {
  const blog = {
    title: 'Testing components',
    url: 'www.like.fi',
    likes: 0
  }
  const mockHandler = jest.fn()
  render(<Blog blog={blog} handleView={mockHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const el = screen.getByText('www.like.fi')
  const likes = screen.getByText(`likes: ${blog.likes}`)
  expect(el).toHaveTextContent(blog.url)
  expect(likes).toBeInTheDocument()
})

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Testing',
    url: 'www.test.fi',
    likes: 0
  }

  const mockHandler = jest.fn()
  render(<Blog blog={blog} handleView={mockHandler} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const button2 = screen.getByPlaceholderText('lbutton')
  await user.click(button2)
  await user.click(button2)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('renders title', () => {
  const blog = {
    title: 'Testing components'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Testing components')
  expect(element).toBeDefined()
})
