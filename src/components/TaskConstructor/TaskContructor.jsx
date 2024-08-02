import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLessonByIdThunk } from "../../redux/lesson/operation";
import { getAllLessons, getIsLoading } from "../../redux/lesson/selectors";
import { ReactComponent as EditIcon } from "../../images/icons/editBlack.svg";
import { ReactComponent as ReadIcon } from "../../images/icons/list.svg";
import LectureConstructor from "./LectureConstructor/LectureConstructor";
import TestConstructor from "./TestConstructor/TestConstructor";
import LectureHeader from "../TasksHeader/LectureHeader";
import TestHeader from "../TasksHeader/TestHeader";
import styles from "./TaskConstructor.module.scss";
import LectureContent from "../Lecture/LectureContent";
import { getAllCourses } from "../../redux/course/selectors";
import { getUserInfo } from "../../redux/user/selectors";
import Spinner from "../Spinner/Spinner";

const TaskContructor = () => {
  const [viewTypeIndex, setViewTypeIndex] = useState(0);
  const { taskId } = useParams();
  const lessons = useSelector(getAllLessons);
  const courses = useSelector(getAllCourses);
  const username = useSelector(getUserInfo).username;
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const task = lessons.find(({ id }) => id === +taskId);
  const taskType = task?.type;

  const courseId = task?.course_id;
  const course = courses.find(({ id }) => id === +courseId);
  const courseName = course?.title;

  console.log(username);

  useEffect(() => {
    if (taskId && username) {
      dispatch(getLessonByIdThunk(+taskId));
    }
    // eslint-disable-next-line
  }, [taskId, username]);

  const getConstructorByType = () => {
    switch (taskType) {
      case "lecture":
        const lectureAttributes = task.lecture_info.attributes;
        return (
          <>
            <LectureHeader
              lecture={task}
              switcherItems={[<EditIcon />, <ReadIcon />]}
              switcherValue={viewTypeIndex}
              switcherOnChange={setViewTypeIndex}
            />
            {viewTypeIndex === 0 && (
              <LectureConstructor initialBlocks={lectureAttributes} />
            )}
            {viewTypeIndex === 1 && (
              <div className={styles.lectureContentWrapper}>
                <LectureContent lecture={{ courseName, ...task }} />
              </div>
            )}
          </>
        );
      case "test":
        console.log(task);
        return (
          <>
            <TestHeader test={task} />
            <TestConstructor
              attempts={task.test_data?.attempts}
              initialBlocks={task.test_data?.questions}
              score={task.test_data?.score}
              testId={task.test_data?.test_id}
            />
          </>
        );
      default:
        return (
          <div className={styles.loaderWrapper}>
            {isLoading ? <Spinner /> : <p>Unknown lesson</p>}
          </div>
        );
    }
  };

  return (
    <div className={styles.constructorWrapper}>{getConstructorByType()}</div>
  );
};

export default TaskContructor;
