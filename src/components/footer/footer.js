import React from "react";
import PropTypes from "prop-types";

import TaskFilter from "../task-filter";

import "./footer.css";

function Footer({ todoCount, filter, onFilterChange, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <ul className="filters">
        <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      </ul>
      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  todoCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
