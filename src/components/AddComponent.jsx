import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi.js";
import Joi from "joi";
import { addDoc, collection } from "firebase/firestore";
import auth from "../services/auth";
import UserContext from "./../context/UserContext";
import Input from "./common/Input";
import Select from "./common/Select";

const AddComponent = ({ onTaskAdd }) => {
  const timerState = {
    isActive: false,
    createdAt: "Timer Not Set",
    remainingTime: "Timer Not Set",
    endsAt: "Timer Not Set",
  };
  const history = {
    events: [],
  };
  const taskKeys = {
    timeStamp: new Date(),
    completed: false,
    timerState,
    history,
  };

  const queryClient = useQueryClient();

  const { data, error, isLoading, mutate } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: (newTask) => {
      addDoc(collection(auth.database, "tasks"), {
        ...newTask,
        ...taskKeys,
      });
    },
  });

  const { user } = useContext(UserContext);
  const categories = [
    { label: "Utility" },
    { label: "Entertainment" },
    { label: "Purchase" },
    { label: "Sports" },
    { label: "Household" },
  ];
  const priorityLevels = [
    { label: "Low" },
    { label: "Medium" },
    { label: "High" },
  ];

  const schema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    category: Joi.string().optional().allow(""),
    priority: Joi.string().optional().allow(""),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate(data);
        reset();
      })}
      className="mt-4"
    >
      <Input name="title" label="Title" register={register} errors={errors} />
      <Input
        name="description"
        label="Description"
        register={register}
        errors={errors}
      />
      <Select
        name="category"
        label="Category"
        register={register}
        errors={errors}
        options={categories}
      />
      <Select
        name="priority"
        label="Set priority for your task"
        register={register}
        errors={errors}
        options={priorityLevels}
      />
      <button disabled={!user} className="btn btn-primary mx-5">
        Add Task
      </button>
    </form>
  );
};

export default AddComponent;
