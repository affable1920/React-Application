import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi.js";
import { collection, getDocs } from "firebase/firestore";
import auth from "../services/auth";
import Joi from "joi";
import Input from "./common/Input";
import Dropdown from "./Dropdown";
import Portal from "./Portal";
import teamService from "../services/teamService";
import { MdArrowDropDownCircle } from "react-icons/md";

const TeamForm = () => {
  const label = "Select members that will be part of this team";
  const schema = Joi.object({
    name: Joi.string().trim().required().min(3).label("Team Name"),
    users: Joi.array().min(2).required().label("Users"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({ resolver: joiResolver(schema) });

  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersCollection = await getDocs(collection(auth.database, "users"));
      const users = usersCollection.docs.map((doc) => doc.data());

      setUsers(users);
    };
    getUsers();
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown((p) => !p);
  };

  const handleUserSelect = (e, user) => {
    e.preventDefault();

    const existingUser = selectedUsers.find((u) => u.uid === user.uid);
    if (existingUser) {
      const updated = selectedUsers.filter((u) => u.uid !== user.uid);
      setSelectedUsers(updated);
      setValue("users", updated);
    } else {
      setSelectedUsers([...selectedUsers, user]);
      setValue("users", [...selectedUsers, user]);
    }
  };

  const onSubmit = (data) => {
    teamService.teamCreate(data);
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        label="Name your team"
        register={register}
        errors={errors}
      />
      <div className="dropdown-container">
        <div>
          <button
            onClick={handleDropdownToggle}
            id="btn-dropdown-toggler"
            className="btn btn-warning"
          >
            {label}
            <MdArrowDropDownCircle />
          </button>
        </div>
        <Portal open={showDropdown} onClose={handleDropdownToggle}>
          <Dropdown
            selectedUsers={selectedUsers}
            options={users}
            onUserSelect={handleUserSelect}
            register={register}
          />
        </Portal>
      </div>
      <button
        // disabled={selectedUsers.length === 0}
        className="btn btn-primary mx-5 mt-3"
      >
        Create
      </button>
    </form>
  );
};

export default TeamForm;
