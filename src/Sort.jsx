import React from "react";
import Button from "Button.jsx";

const Sort = ({ sortKey, onSort, children }) => {
  return <Button onClick={() => onSort(sortKey)}>{children}</Button>;
};

export default Sort;
