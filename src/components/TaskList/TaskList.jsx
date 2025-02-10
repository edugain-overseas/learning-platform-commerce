import React from "react";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/selectors";
import AdminList from "./AdminList";
import StudentList from "./StudentList";

const TaskList = ({ tasks = [] }) => {
  const isModer = useSelector(getUserType) === "moder";

  const sortedItemsByNumber = [...tasks].sort(
    (itemA, itemB) => itemA.number - itemB.number
  );

  return isModer ? (
    <AdminList items={sortedItemsByNumber} />
  ) : (
    <StudentList items={sortedItemsByNumber} />
  );
};

export default TaskList;
