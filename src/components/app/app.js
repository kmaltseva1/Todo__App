import { Component } from 'react'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import './app.css'

export default class App extends Component {
  static filterItem(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.status)
      case 'completed':
        return items.filter((item) => item.status)
      default:
        return items
    }
  }

  static createTodoItem(label, createdTime) {
    const newItem = {
      label,
      status: false,
      edit: false,
      id: Date.now(),
      error: false,
      created: createdTime,
    }
    return newItem
  }

  constructor() {
    super()
    this.state = {
      todoData: [],
      filter: 'all',
    }
  }

  get getComplited() {
    const { todoData } = this.state
    const doneCount = todoData.length ? todoData.filter((el) => el.status).length : []
    const todoCount = todoData.length - doneCount
    return todoCount
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  toggleStatus = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const el = todoData[index]
      const newEl = { ...el, status: !el.status }
      const render = [...todoData.slice(0, index), newEl, ...todoData.slice(index + 1)]
      return { todoData: render }
    })
  }

  deleteCompletedItems = () => {
    this.setState(({ todoData }) => {
      const activeItems = todoData.filter((item) => !item.status)
      return {
        todoData: activeItems,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const newArr = [...todoData.slice(0, index), ...todoData.slice(index + 1)]
      return {
        todoData: newArr,
      }
    })
  }

  changeLabel = (text, id) => {
    this.setState(({ todoData }) => {
      if (!text.trim()) {
        const index = todoData.findIndex((el) => el.id === id)
        const el = todoData[index]
        const newEl = { ...el, error: true, label: text }
        const render = [...todoData.slice(0, index), newEl, ...todoData.slice(index + 1)]
        return { todoData: render }
      }
      const index = todoData.findIndex((el) => el.id === id)
      const el = todoData[index]
      const newEl = { ...el, label: text, error: false }
      const render = [...todoData.slice(0, index), newEl, ...todoData.slice(index + 1)]
      return { todoData: render }
    })
  }

  addItem = (text) => {
    if (!text.trim()) {
      return
    }
    const newItem = App.createTodoItem(text, Date.now())
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  editItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const el = todoData[index]
      if (el.error) {
        return { todoData }
      }
      const newEl = { ...el, edit: !el.edit }
      const render = [...todoData.slice(0, index), newEl, ...todoData.slice(index + 1)]
      return { todoData: render }
    })
  }

  render() {
    const { todoData, filter } = this.state
    const visibleItems = App.filterItem(todoData, filter)
    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggle={this.toggleStatus}
            onEdit={this.editItem}
            changeLabel={this.changeLabel}
          />
          <Footer
            getComplited={this.getComplited}
            filterItem={App.filterItem}
            filter={filter}
            onFilterChange={this.onFilterChange}
            deleteCompletedItems={this.deleteCompletedItems}
          />
        </section>
      </section>
    )
  }
}
