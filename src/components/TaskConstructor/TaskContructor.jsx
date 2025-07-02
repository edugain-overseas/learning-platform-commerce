import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLessonByIdThunk } from "../../redux/lesson/operation";
import { getAllLessons, getIsLoading } from "../../redux/lesson/selectors";
import { ReactComponent as EditIcon } from "../../images/icons/editBlack.svg";
import { ReactComponent as ReadIcon } from "../../images/icons/list.svg";
import { LectureConstructorProvider } from "../../context/LectureConstructorContext";
import { getAllCourses } from "../../redux/course/selectors";
import { getUserInfo } from "../../redux/user/selectors";
import LectureConstructor from "./LectureConstructor/LectureConstructor";
import TestConstructor from "./TestConstructor/TestConstructor";
import LectureHeader from "../TasksHeader/LectureHeader";
import TestHeader from "../TasksHeader/TestHeader";
import LectureContent from "../Lecture/LectureContent";
import Spinner from "../Spinner/Spinner";
import styles from "./TaskConstructor.module.scss";
import { TestContructorProvider } from "../../context/TestContructorContext";
import TestContent from "../Test/TestContent";

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

  console.log(task);

  useEffect(() => {
    if (taskId && username) {
      dispatch(getLessonByIdThunk(+taskId));
    }
    // eslint-disable-next-line
  }, [taskId, username]);

  const getConstructorByType = () => {
    switch (taskType) {
      case "lecture":
        return (
          <>
            <LectureConstructorProvider>
              <LectureHeader
                lecture={task}
                switcherItems={[<EditIcon />, <ReadIcon />]}
                switcherValue={viewTypeIndex}
                switcherOnChange={setViewTypeIndex}
              />
              {viewTypeIndex === 0 && <LectureConstructor />}
              {viewTypeIndex === 1 && (
                <div className={styles.lectureContentWrapper}>
                  <LectureContent lecture={{ courseName, ...task }} />
                </div>
              )}
            </LectureConstructorProvider>
          </>
        );
      case "test":
      case "exam":
        return (
          <TestContructorProvider>
            <TestHeader
              test={task}
              switcherItems={[<EditIcon />, <ReadIcon />]}
              switcherValue={viewTypeIndex}
              switcherOnChange={setViewTypeIndex}
            />
            {viewTypeIndex === 0 && (
              <TestConstructor
                attempts={task[`${taskType}_data`]?.attempts}
                initialBlocks={task[`${taskType}_data`]?.questions}
                score={task[`${taskType}_data`]?.score}
                testId={task[`${taskType}_data`]?.[`${taskType}_id`]}
                lessonType={task.type}
                timer={task[`${taskType}_data`]?.timer}
              />
            )}
            {viewTypeIndex === 1 && (
              <TestContent
                test={task}
                closed={true}
                wrapperStyles={{ marginInline: "10%", opacity: 1 }}
              />
            )}
          </TestContructorProvider>
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
