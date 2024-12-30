import React, { Component } from "react";
import "./new-task-form.css";

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: "",
    };

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: "",
      });
    };
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </form>
      </header>
    );
  }
}
