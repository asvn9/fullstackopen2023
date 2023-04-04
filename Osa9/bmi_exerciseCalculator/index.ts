import express from "express"
import { calculateBmi } from "./bmiCalculator"
import { calculateExercises } from "./exerciseCalculator"
const app = express()
app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send(calculateBmi(75, 180) + "Hello Full Stack!")
})

app.get("/bmi", (_req, res) => {
  const query = _req.query
  const weight = Number(query.weight)
  const height = Number(query.height)

  if (isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: "malformatted parameters" })
  }
  return res.json({
    weight: weight,
    height: height,
    bmi: calculateBmi(weight, height),
  })
})

app.post("/calculator", (req, res) => {
  const arr = req.body.dailyExercises
  const target = req.body.target

  if (arr.length === 0) {
    return res
      .status(400)
      .json({ error: "dailyExercises parameter is missing" })
  }
  if (arr.some(isNaN)) {
    return res
      .status(400)
      .json({
        error: "dailyExercises parameter is not a valid array of numbers",
      })
  }
  if (!target) {
    return res.status(400).json({ error: "target is missing" })
  }

  const result = calculateExercises(arr, req.body.target)
  return res.json({ result })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
