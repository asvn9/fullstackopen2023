import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Diaryform {
  id: number
  date: string,
  weather: string,
  visibility: string,
  comment: string
}

const CreateDiaryForm = () => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [notification, setNotification] = useState('')

  const [diaries, setDiaries] = useState<Diaryform[]>([])
  useEffect(() => {
    axios.get('http://localhost:3001/api/diaries').then(response => {
      setDiaries(response.data)
    })
  }, [])

  const createDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
      id: diaries.length + 1
    }
    try {
      const response = await axios.post<Diaryform>('http://localhost:3001/api/diaries', diaryToAdd)
      setDiaries(diaries.concat(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotification(error.response?.data)
        setTimeout(() => {
          setNotification("")
        }, 5000)
      }
    }

  }

  return (
    <div>
      <div style={{ color: notification === "success" ? "green" : "red" }}>
        {notification}
      </div>
      <h2>Add new diary</h2>
      <form onSubmit={createDiary}>
        date<input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)} />

        <div>Visibility
          <label><input
            type="radio"
            value="poor"
            checked={visibility === "poor"}
            onChange={(event) => setVisibility(event.target.value)} />
            Poor
          </label>
          <label><input
            type="radio"
            value="ok"
            checked={visibility === "ok"}
            onChange={(event) => setVisibility(event.target.value)} />
            Ok
          </label>
          <label><input
            type="radio"
            value="good"
            checked={visibility === "good"}
            onChange={(event) => setVisibility(event.target.value)} />
            Good
          </label>
          <label><input
            type="radio"
            value="great"
            checked={visibility === "great"}
            onChange={(event) => setVisibility(event.target.value)} />
            Great
          </label>
        </div>
        <div>
          Weather
          <label>
            <input
              type="radio"
              value="sunny"
              checked={weather === "sunny"}
              onChange={(event) => setWeather(event.target.value)}
            />
            Sunny
          </label>
          <label>
            <input
              type="radio"
              value="cloudy"
              checked={weather === "cloudy"}
              onChange={(event) => setWeather(event.target.value)}
            />
            Cloudy
          </label>
          <label>
            <input
              type="radio"
              value="rainy"
              checked={weather === "rainy"}
              onChange={(event) => setWeather(event.target.value)}
            />
            Rainy
          </label>
          <label>
            <input
              type="radio"
              value="stormy"
              checked={weather === "stormy"}
              onChange={(event) => setWeather(event.target.value)}
            />
            Stormy
          </label>
          <label>
            <input
              type="radio"
              value="windy"
              checked={weather === "windy"}
              onChange={(event) => setWeather(event.target.value)}
            />
            Windy
          </label>
        </div>
        comment<input
          value={comment}
          onChange={(event) => setComment(event.target.value)} />
        <button type='submit'>add</button>

      </form>

      <h2>Diary entries</h2>
      {diaries.map(diary => <div key={diary.id}><p><b>{diary.date}</b></p>weather: {diary.weather}</div>)}
    </div>
  )
}

export default CreateDiaryForm
