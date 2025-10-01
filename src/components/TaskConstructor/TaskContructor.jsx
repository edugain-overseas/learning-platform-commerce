import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCourses } from "../../redux/course/selectors";
import { getUserInfo } from "../../redux/user/selectors";
import { getLessonByIdThunk } from "../../redux/lesson/operation";
import { TestContructorProvider } from "../../context/TestContructorContext";
import { getAllLessons, getIsLoading } from "../../redux/lesson/selectors";
import { ReactComponent as EditIcon } from "../../images/icons/editBlack.svg";
import { ReactComponent as EyeIcon } from "../../images/icons/eye-secondary.svg";
import { LectureConstructorProvider } from "../../context/LectureConstructorContext";
import LectureConstructor from "./LectureConstructor/LectureConstructor";
import TestConstructor from "./TestConstructor/TestConstructor";
import LectureHeader from "../TasksHeader/LectureHeader";
import TestHeader from "../TasksHeader/TestHeader";
import LectureContent from "../Lecture/LectureContent";
import Spinner from "../Spinner/Spinner";
import TestContent from "../Test/TestContent";
import styles from "./TaskConstructor.module.scss";
import TaskLayout from "../shared/TaskLayout/TaskLayout";
import PreviewStudentAsideCourseProgressPanel from "./PreviewStudentAsideCourseProgressPanel";

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
                switcherItems={[
                  <EditIcon title="Edit" />,
                  <EyeIcon title="Preview" />,
                ]}
                switcherValue={viewTypeIndex}
                switcherOnChange={setViewTypeIndex}
              />
              {viewTypeIndex === 0 && <LectureConstructor />}
              {viewTypeIndex === 1 && (
                <TaskLayout.Container>
                  <TaskLayout.Content>
                    <LectureContent lecture={{ courseName, ...task }} />
                  </TaskLayout.Content>
                  <TaskLayout.Tools>
                    <PreviewStudentAsideCourseProgressPanel
                      lessons={course.lessons}
                      currentLessonId={+taskId}
                    />
                  </TaskLayout.Tools>
                </TaskLayout.Container>
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
              switcherItems={[<EditIcon />, <EyeIcon />]}
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
              <TaskLayout.Container>
                <TaskLayout.Content>
                  <TestContent
                    test={task}
                    closed={true}
                    wrapperStyles={{ opacity: 1 }}
                  />
                </TaskLayout.Content>
                <TaskLayout.Tools>
                  <PreviewStudentAsideCourseProgressPanel
                    lessons={course.lessons}
                    currentLessonId={+taskId}
                  />
                </TaskLayout.Tools>
              </TaskLayout.Container>
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
