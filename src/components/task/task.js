import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default function Task({ label, onDeleted, onToggle, status, onEdit, created }) {
  const timeAgo = formatDistanceToNow(created, { includeSeconds: true })

  return (
    <div className="view">
      <input className="toggle" type="checkbox" onChange={onToggle} checked={status} />
      <label htmlFor="username">
        <span id="username" className="description">
          {label}
        </span>
        <span className="created">created {timeAgo} ago</span>
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
