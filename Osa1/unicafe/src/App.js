import { useState } from 'react'


const StatisticLine = ({ text, value }) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Button = ({ setValue, value, text }) => {
  return (
    <button onClick={() => setValue(value + 1)}>{text}</button>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral
  const avg = (good + bad * -1) / total
  const pos = good / total * 100

  if (good + neutral + bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={pos} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button setValue={setGood} value={good} text="good" />
      <Button setValue={setNeutral} value={neutral} text="neutral" />
      <Button setValue={setBad} value={bad} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App