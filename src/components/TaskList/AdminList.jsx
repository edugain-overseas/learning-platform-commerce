import { useListMode } from "../../context/ListModeContext";
import CreateNewLessonBtn from "../CreateNewLessonBtn/CreateNewLessonBtn";
import TaskCard from "./TaskCard";
import TaskRow from "./TaskRow";
import styles from "./TaskList.module.scss";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLessonThunk } from "../../redux/lesson/operation";
import { useParams } from "react-router-dom";
import { getAllCourses } from "../../redux/course/selectors";

const AnminListItem = ({ task }) => {
  const { selectedListModeIndex } = useListMode();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
          pointerEvents: "none",
        }
      : {}),
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {selectedListModeIndex ? (
        <TaskRow task={task} />
      ) : (
        <TaskCard task={task} />
      )}
    </li>
  );
};

const AdminList = ({ items }) => {
  const { selectedListModeIndex } = useListMode();
  const [messageApi, contextHolder] = useNotificationMessage();
  const { courseId } = useParams();
  const [lessons, setLessons] = useState(items);
  const dispatch = useDispatch();
  const isCoursePublished = useSelector(getAllCourses)?.find(
    (course) => course.id === +courseId
  )?.is_published;

  useEffect(() => {
    if (items) {
      setLessons(items);
    }
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const updateLessonsNumbers = async (newLessons) => {
    const lessonsToUpdate = newLessons.filter(
      (lesson) =>
        items?.find(({ id }) => id === lesson.id).number !== lesson.number
    );
    const updatedLessonsData = lessonsToUpdate.map(({ id, number }) => ({
      id,
      number,
    }));

    try {
      const result = await Promise.all(
        updatedLessonsData.map((lesson) =>
          dispatch(
            updateLessonThunk({ courseId: +courseId, updatedLesson: lesson })
          ).unwrap()
        )
      );
      if (result) {
        messageApi.success({
          content: "Lessons was successfully reordered!",
          duration: 3,
        });
      }
    } catch (error) {
      messageApi.error({
        content: "Something went wrong!",
        duration: 3,
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      if (isCoursePublished) {
        messageApi.error({
          content:
            "You can't change order of lessons in course that was published",
          duration: 3,
        });
        return;
      }
      setLessons((prevLessons) => {
        const activeIndex = prevLessons?.findIndex(
          (lesson) => lesson.id === active.id
        );
        const overIndex = prevLessons?.findIndex(
          (lesson) => lesson.id === over?.id
        );
        const newLessons = arrayMove(prevLessons, activeIndex, overIndex).map(
          (lesson, index) => ({
            ...lesson,
            number: index + 1,
          })
        );
        updateLessonsNumbers(newLessons);
        return newLessons;
      });
    }
  };

  return (
    <>
      {contextHolder}
      <ul
        className={`${styles.listWrapper} ${
          selectedListModeIndex ? styles.rowWrapper : styles.cardWrapper
        }`}
      >
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={lessons}>
            {lessons.map((task) => (
              <AnminListItem task={task} key={task.id} />
            ))}
          </SortableContext>
        </DndContext>
        <li className={styles.createNewLessonItem}>
          <CreateNewLessonBtn
            lessonNumber={items[items.length - 1]?.number + 1}
          />
        </li>
      </ul>
    </>
  );
};

export default AdminList;
