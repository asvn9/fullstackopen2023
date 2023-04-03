import {useEffect, useState} from 'react'

const Notification = ({notification}) => {

  const [showNotification, setShowNotification] = useState(notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: showNotification ? 'block' : 'none'
  }

  useEffect(() => {
    setShowNotification(notification)

    const timeout = setTimeout(() => {
        setShowNotification('')
    }, 5000)
    return () => {
        clearTimeout(timeout)
      }
    }, [notification])

  return (
    <div style={style}>
        <div>{showNotification}</div>
    </div>
  )
}

export default Notification