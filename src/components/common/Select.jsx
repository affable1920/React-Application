import React from "react";

const Select = ({
  name,
  label,
  options,
  register,
  errors,
  ifMultiple = false,
}) => {
  return (
    <div className="form-group mx-5 mb-4">
      <label className="mx-1 mb-1" htmlFor={name}>
        {label}
      </label>
      <select multiple={ifMultiple} {...register(name)} className="form-select">
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option?.label}>{option?.label || option} </option>
        ))}
      </select>
      {errors[name] && (
        <div className="alert alert-primary">
          {errors[name]?.message + "  _ " + "You IDIOT!"}
        </div>
      )}
    </div>
  );
};

export default Select;
