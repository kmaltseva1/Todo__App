import React from "react";
import PropTypes from "prop-types";

import Task from "../task";
import "./task-list.css";

function TaskList({
  todos,
  onDeleted,
  onToggleCompleted,
  onToggleEdit,
  setDescription,
}) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <Task
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onToggleEdit={() => onToggleEdit(id)}
        setDescription={(description) => setDescription(item.id, description)}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TaskList;
