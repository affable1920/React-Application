const paginate = (items, pageSize, currentPage) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize - 1;

  return items?.slice(startIndex, endIndex);
};

export default paginate;
