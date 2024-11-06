import React, { useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { publishCourse } from "../../../http/services/course";
import { useDispatch } from "react-redux";
import { publishCourseAction } from "../../../redux/course/slice";
import styles from "./CoursePublishPage.module.scss";

const PublishCourseBtn = ({ setError, messageApi, courseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const errorHandler = (error) => {
    const errorResponse = error.response;
    if (errorResponse?.status === 409) {
      const errorData = errorResponse.data;
      messageApi.error({
        content: errorData.message,
        duration: 3,
      });
      setError(errorData);
    } else {
      messageApi.error({
        content: "Something went wrong. Try again",
        duration: 3,
      });
    }
  };

  const handlePublish = async () => {
    try {
      setIsLoading(true);
      const result = await publishCourse(courseId);
      dispatch(publishCourseAction(+courseId));
      messageApi.success({
        content: result.message,
        duration: 3,
      });

      console.log(result);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      disabled={isLoading}
      onClick={handlePublish}
      className={styles.publishCourseBtn}
    >
      {isLoading ? <Spinner contrastColor={true} size={8} /> : "Publish course"}
    </button>
  );
};

export default PublishCourseBtn;
