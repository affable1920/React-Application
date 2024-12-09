import React, { useContext } from "react";
import TaskContext from "../../context/taskContext";
import TaskRow from "../TaskRow";

const TableBody = () => {
  const { paginatedTasks } = useContext(TaskContext);

  return (
    <section className="tasks-body">
      {paginatedTasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </section>
  );
};

export default TableBody;
