import React from "react";
import { useParams } from "react-router-dom";

const TaskPage = () => {
  const { taskId } = useParams();
  console.log(taskId);
  return <div>{taskId}</div>;
};

export default TaskPage;
