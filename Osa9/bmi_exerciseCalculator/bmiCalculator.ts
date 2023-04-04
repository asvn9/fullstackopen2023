export const calculateBmi = (weight: number, height: number) => {
  if (weight < 20) throw new Error("Weight cannot be less than 20")
  if (height < 40) throw new Error("Height cannot be less than 40")

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    throw new Error("Both height and weight have to be numbers")
  }

  const bmi = weight / Math.pow(height / 100, 2)
  if (bmi < 16) {
    return "Underweight: " + bmi
  } else if (bmi < 24.9 && bmi > 18.5) {
    return "Normal (healthy weight) " + bmi
  }
  return "Overweight: " + bmi
}

const weight = Number(process.argv[2])
const height = Number(process.argv[3])

try {
  console.log(calculateBmi(weight, height))
} catch (error: unknown) {
  let errorMessage = "Something went wrong."
  if (error instanceof Error) {
    errorMessage += " Error:" + error.message
  }
  console.log(errorMessage)
}
