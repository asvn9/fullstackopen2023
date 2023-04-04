interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseArguments = (args: string[]): number[] => {
  const result: number[] = []

  for (let i = 2; i < args.length; i++) {
    const num = Number(args[i])
    if (isNaN(num)) {
      throw new Error("Provided values were not numbers!")
    }
    result.push(num)
  }

  return result
}

export const calculateExercises = (arr: number[], target: number): Result => {
  const trDays = arr
    .slice(0)
    .reduce((days, value) => (value !== 0 ? days + 1 : days), 0)
  const avg = arr.slice(0).reduce((inc, value) => inc + value, 0) / 7
  let suc = false
  if (avg > 2) {
    suc = true
  }

  let ratingDec = "Decent"

  if (avg > target) {
    ratingDec = "Pretty nice!"
  } else if (avg < 1.6) {
    ratingDec = "Could be better"
  }

  return {
    periodLength: arr.length,
    trainingDays: trDays,
    success: suc,
    rating: 2,
    ratingDescription: ratingDec,
    target: target,
    average: avg,
  }
}

try {
  const arr = parseArguments(process.argv)
  const target = 2
  console.log(calculateExercises(arr, target))
} catch (error: unknown) {
  let errorMessage = "Something went wrong. "
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message
  }
  console.log(errorMessage)
}
