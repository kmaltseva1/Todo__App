import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'
import convertFromMillisec from '../../utils/convertFromMillisec'

class Task extends Component {
  timerId = null

  constructor(props) {
    super(props)
    this.state = {
      play: true,
      pause: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { milliseconds } = this.props
    if (milliseconds !== prevProps.milliseconds) {
      if (milliseconds <= 0) {
        this.timerPause()
        this.disableAll()
      }
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      this.timerPause()
    }
  }

  disablePlay = () => {
    this.setState({ play: false, pause: true })
  }

  disablePause = () => {
    this.setState({ play: true, pause: false })
  }

  disableAll = () => {
    this.setState({ play: false, pause: false })
  }

  timerRun = () => {
    const { timer, milliseconds } = this.props
    if (milliseconds !== 0) {
      if (!this.timerId) {
        this.timerId = setInterval(() => timer(), 1000)
        this.disablePlay()
      }
    }
  }

  timerPause = () => {
    clearInterval(this.timerId)
    this.disablePause()
    this.timerId = null
  }

  render() {
    const { label, onDeleted, onToggle, status, onEdit, created, milliseconds } = this.props

    const { play, pause } = this.state

    const timeAgo = formatDistanceToNow(created, { includeSeconds: true })

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggle} checked={status} />
        <label htmlFor="username">
          <span id="username" className="title">
            {label}
          </span>
          <span className="description">
            <button
              type="button"
              className="icon icon-play"
              aria-label="icon play"
              onClick={this.timerRun}
              disabled={!play}
            />
            <button
              type="button"
              className="icon icon-pause"
              aria-label="icon pause"
              onClick={this.timerPause}
              disabled={!pause}
            />
            {convertFromMillisec(milliseconds)}
          </span>
          <span className="description">created {timeAgo} ago</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEdit} aria-label="edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="destroy" />
      </div>
    )
  }
}

Task.defaultProps = {
  status: false,
  label: '',
  onDeleted: () => {},
  onToggle: () => {},
  onEdit: () => {},
}

Task.propTypes = {
  status: PropTypes.bool,
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggle: PropTypes.func,
  onEdit: PropTypes.func,
}

export default Task
