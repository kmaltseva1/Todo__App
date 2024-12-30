import React, { Component } from "react";
import PropTypes from "prop-types";

// import { formatDistanceToNow } from "date-fns";

export default class Task extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };

    this.onDescriptionChange = (event) => {
      this.setState({
        value: event.target.value,
      });
    };

    this.taskEdit = () => {
      if (this.props.edit) {
        this.props.setDescription(this.state.value);
      }
    };

    this.keydownEditHandle = (event) => {
      if (event.key === "Enter") {
        this.taskEdit(event);
      }
    };
    document.addEventListener("keydown", this.keydownEditHandle);
  }

  render() {
    const {
      description,
      id,
      completed,
      // created,
      edit,
      onDeleted,
      onToggleCompleted,
      onToggleEdit,
    } = this.props;
    let classNames = "";
    if (completed) {
      classNames = "completed";
    }

    if (edit) {
      classNames = "editing";
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={onToggleCompleted}
          />
          <label>
            <span className="description">{description}</span>
            {/* <span className="created">{formatDistanceToNow()}</span> */}
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={onToggleEdit}
            aria-label="editing task"
          />

          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDeleted}
            aria-label={onDeleted}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.value}
          onChange={this.onDescriptionChange}
        />
      </li>
    );
  }
}

Task.defaultProps = {
  description: "Default content",
};

Task.propTypes = {
  description: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
};
