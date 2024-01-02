import React from "react";
import { useParams } from "react-router-dom";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  return <div>Course {courseId} Detail Page</div>;
};

export default CourseDetailPage;
