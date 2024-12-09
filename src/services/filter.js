const filter = (items, query, status) => {
  const filteredTasks = items;

  if (query)
    return filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );

  if (status)
    return filteredTasks.filter((task) =>
      status === "Finished"
        ? task.completed === true
        : status === "Not Finished"
        ? task.completed === false
        : task.completed === true
    );
};

export default filter;
