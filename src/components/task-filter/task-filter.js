import { Component } from 'react'
import PropTypes from 'prop-types'

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', lable: 'All' },
    { name: 'active', lable: 'Active' },
    { name: 'completed', lable: 'Completed' },
  ]

  render() {
    const { filter, onFilterChange } = this.props
    const buttons = this.buttons.map(({ name, lable }) => {
      const isActive = filter === name
      const activeClass = isActive ? 'selected' : ''
      return (
        <li key={name}>
          <button type="button" className={activeClass} onClick={() => onFilterChange(name)}>
            {lable}
          </button>
        </li>
      )
    })
    return <ul className="filters">{buttons}</ul>
  }
}

TaskFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
}

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
}
