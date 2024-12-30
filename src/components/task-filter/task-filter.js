import React from "react";
import PropTypes from "prop-types";

function TaskFilter({ filter, onFilterChange }) {
  const filterButtons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  const buttons = filterButtons.map(({ name, label }) => {
    let classNames;
    if (name === filter) {
      classNames = "selected";
    }

    return (
      <button
        key={name}
        type="button"
        onClick={() => onFilterChange(name)}
        className={classNames}
      >
        {label}
      </button>
    );
  });

  return <li>{buttons}</li>;
}

TaskFilter.defaultProps = {
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func,
};

export default TaskFilter;
