import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi.js";
import Joi from "joi";
import auth from "../services/auth";
import Input from "./common/Input";

const LoginForm = () => {
  const schema = Joi.object({
    email: Joi.string().trim().required().label("Email"),
    password: Joi.string().trim().required().label("Password"),
  });

  const [error, setError] = useState("");
  useEffect(() => {
    if ((error && error.includes("email")) || error.includes("invalid"))
      setError("Invalid email or password !");
  }, [error]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await auth.login(data);
      window.location = "/";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input name="email" label="Email" register={register} errors={errors} />
      <Input
        name="password"
        label="Password"
        register={register}
        errors={errors}
      />
      <button className="btn btn-primary mx-5">Log In</button>
      {error && <div className="mx-5 mt-3 alert alert-danger">{error}</div>}
    </form>
  );
};

export default LoginForm;
