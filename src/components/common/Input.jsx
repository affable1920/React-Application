import React from "react";

const Input = ({ name, label, register, errors, ...rest }) => {
  return (
    <div className="form-group mx-5 mb-5">
      <label className="mx-1 mb-1" htmlFor={name}>
        {label}
      </label>
      <input className="form-control" id={name} {...rest} {...register(name)} />
      {errors[name] && (
        <div className="alert alert-primary">
          {errors[name]?.message + "  _ " + "You IDIOT!"}
        </div>
      )}
    </div>
  );
};

export default Input;
