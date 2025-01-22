import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'
import convertFromMillisec from '../../utils/convertFromMillisec'

function Task({ label, onDeleted, onToggle, status, onEdit, created, milliseconds, isRunning, timerRun, timerPause }) {
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
            onClick={timerRun}
            disabled={isRunning}
          />
          <button
            type="button"
            className="icon icon-pause"
            aria-label="icon pause"
            onClick={timerPause}
            disabled={!isRunning || milliseconds <= 0}
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
