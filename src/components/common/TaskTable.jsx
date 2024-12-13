import React from "react";
import TableBody from "./TableBody";

const TaskTable = ({ pages }) => {
  return (
    <>
      {pages?.map((page) => (
        <React.Fragment>
          <TableBody page={page} />
        </React.Fragment>
      ))}
    </>
  );
};

export default TaskTable;
