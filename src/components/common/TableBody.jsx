import React from "react";
import TaskRow from "../TaskRow";

const TableBody = ({ tasks }) => {
  return (
    <section className="tasks-body">
      {tasks?.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </section>
  );
};

export default TableBody;
