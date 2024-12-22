import React, { useContext } from "react";
import TaskContext from "../context/taskContext";

const SearchBar = () => {
  const { setQuerySearchString } = useContext(TaskContext);

  return (
    <div id="search-bar">
      <input
        onChange={(e) => setQuerySearchString(e.target.value)}
        className="form-control"
        placeholder="Search for a task"
      />
    </div>
  );
};

export default SearchBar;
