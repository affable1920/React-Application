import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi.js";
import { toast } from "react-toastify";
import Joi from "joi";
import auth from "../services/auth";
import Input from "./common/Input";
import Select from "./common/Select";

const RegisterForm = () => {
  const [error, setError] = useState("");

  const schema = Joi.object({
    username: Joi.string().trim().min(4).required().label("Username"),
    email: Joi.string().trim().required().label("Email"),
    password: Joi.string().required().min(2).label("Password"),
    role: Joi.string().invalid("Select").trim().required().label("Role"),
  });

  const userRoles = [
    { tagline: "Chief Commander", label: "Admin" },
    { tagline: "The Peacekeeper", label: "Moderator" },
    { tagline: "The Builder", label: "Team Member" },
    { tagline: "Visitor", label: "Guest" },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await auth.register(data);
      window.location = "/";
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="register-form"
        className="mt-2"
      >
        <Input name="email" label="Email" register={register} errors={errors} />
        <Input
          name="password"
          label="Password"
          register={register}
          errors={errors}
        />
        <Input
          name="username"
          label="Username:  What do you want to be called ?"
          register={register}
          errors={errors}
        />
        <Select
          name="role"
          label="Choose your role in the matrix"
          register={register}
          options={userRoles}
          errors={errors}
        />
        {error && <div className="alert alert-danger mx-5">{error}</div>}
        <button className="btn btn-primary mx-5">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
