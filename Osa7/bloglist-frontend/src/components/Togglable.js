import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <span>
      <span style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </span>
      <span style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        {props.children}
      </span>
    </span>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
