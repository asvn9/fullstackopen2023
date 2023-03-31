import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))
  const [top, setTop] = useState(0)


  const handleClick = () => {
    let rand = Math.random()
    rand = Math.floor(rand*7)
    setSelected(rand)
  }

  const handleVoteClick = () =>{
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    const top = copy.indexOf(Math.max(...copy))
    setTop(top)

  }

  return (
    <div>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button handleClick = {handleClick} text ='next anecdote' /> 
      <Button handleClick = {handleVoteClick} text ='vote' /> 
      <h2><p>Anecdote with most votes</p></h2>
        {anecdotes[top]}
        <p> has {votes[top]} votes</p>
    </div>
  )
}

export default App