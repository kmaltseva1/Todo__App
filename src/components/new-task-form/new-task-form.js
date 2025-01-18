import { Component } from 'react'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      min: '',
      sec: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onItemAdded } = this.props
    const { label, min, sec } = this.state
    onItemAdded(label, min, sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input type="text" className="new-todo" placeholder="Task" onChange={this.onLabelChange} value={label} />
          <input
            type="number"
            step={1}
            min={0}
            max={120}
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onMinChange}
            value={min}
          />
          <input
            type="number"
            step={1}
            min={0}
            max={60}
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onSecChange}
            value={sec}
          />
          <input type="submit" className="new-todo-form__button" />
        </form>
      </header>
    )
  }
}
