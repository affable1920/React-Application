import React, { useContext } from "react";
import TaskContext from "../context/taskContext";

const SearchBar = () => {
  const { tasks, searchQuery, setSearchQuery } = useContext(TaskContext);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (tasks?.length <= 1) return null;
  return (
    <div id="search-bar">
      <input
        className="form-control"
        placeholder="Search for a task"
        onChange={handleChange}
        value={searchQuery}
      />
    </div>
  );
};

export default SearchBar;
