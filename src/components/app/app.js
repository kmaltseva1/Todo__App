import React, { Component } from "react";

import Footer from "../footer";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";

import "./app.css";

export default class App extends Component {
  maxId = 1;

  constructor() {
    super();

    this.state = {
      todoData: [
        this.createTodoItem("First task"),
        this.createTodoItem("Second task"),
        this.createTodoItem("Third task"),
      ],
      filter: "all",
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((el) => el.id === id);
        return {
          todoData: [...todoData.slice(0, index), ...todoData.slice(index + 1)],
        };
      });
    };

    this.addItem = (text) => {
      if (text.length > 0 && text.charAt(0) !== " ") {
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData }) => {
          return {
            todoData: [...todoData, newItem],
          };
        });
      }
    };

    this.onToggleCompleted = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, "completed"),
        };
      });
    };

    this.onFilterChange = (filter) => {
      this.setState({ filter });
    };

    this.onClearCompleted = () => {
      this.setState(({ todoData }) => {
        return {
          todoData: todoData.filter((el) => !el.completed),
        };
      });
    };

    this.filter = (todoData, filter) => {
      if (filter === "all") {
        return todoData;
      }
      if (filter === "active") {
        return todoData.filter((item) => !item.completed);
      }
      if (filter === "completed") {
        return todoData.filter((item) => item.completed);
      }
      return todoData;
    };

    this.setDescription = (id, description) => {
      if (description.length > 0 && description.charAt(0) !== " ") {
        const { todoData } = this.state;
        const taskIndex = todoData.findIndex((task) => task.id === id);
        todoData[taskIndex].description = description;
        todoData[taskIndex].edit = false;

        this.setState({ todoData });
      }
    };

    this.onToggleEdit = (id) => {
      this.state.todoData.map((item) => {
        item.edit = false;
        return item;
      });

      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, "edit"),
        };
      });
    };

    this.toggleProperty = (arr, id, propName) => {
      const index = arr.findIndex((el) => el.id === id);
      const oldItem = arr[index];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
    };
  }

  createTodoItem(description) {
    return {
      description,
      id: this.maxId++,
      completed: false,
      created: new Date(),
      edit: false,
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const completedCount = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - completedCount;
    const visibleItems = this.filter(todoData, filter);

    return (
      <section className="main">
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleCompleted={this.onToggleCompleted}
          onToggleEdit={this.onToggleEdit}
          setDescription={this.setDescription}
        />
        <Footer
          todoCount={todoCount}
          className="footer"
          filter={filter}
          onFilterChange={this.onFilterChange}
          onClearCompleted={this.onClearCompleted}
          onToggleEdit={this.onToggleEdit}
          setDescription={this.setDescription}
        />
      </section>
    );
  }
}
