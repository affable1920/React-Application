import React from "react";
import TableBody from "./TableBody";

const TaskTable = ({ pages }) => {
  return (
    <>
      {pages?.map(({ tasks }) => (
        <React.Fragment>
          <TableBody tasks={tasks} />
        </React.Fragment>
      ))}
    </>
  );
};

export default TaskTable;
