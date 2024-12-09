import React from "react";

const Dropdown = ({ options, onUserSelect, selectedUsers, register }) => {
  return (
    <div className="user-dropdown">
      {options.map((option) => (
        <div key={option + Math.random().toString(22)} className="user">
          <input
            type="checkbox"
            checked={selectedUsers.includes(option)}
            onChange={(e) => onUserSelect(e, option)}
          />
          <input type="hidden" register={{ ...register("users") }} />
          <span>{option.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
