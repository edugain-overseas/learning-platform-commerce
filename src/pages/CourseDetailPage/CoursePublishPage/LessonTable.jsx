import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ConfigProvider, Table } from "antd";
import { useDispatch } from "react-redux";
import { updateLessonThunk } from "../../../redux/lesson/operation";
import styles from "./CoursePublishPage.module.scss";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    render: (text, record) => <Link to={`/task/${record.id}`}>{text}</Link>,
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Scheduled Time",
    dataIndex: "scheduled_time",
  },
  {
    title: "Number",
    dataIndex: "number",
  },
];

const Row = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
        }
      : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

const LessonsTable = ({
  lessonsTableData,
  courseTitle,
  isCoursePublished = false,
  messageApi,
}) => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState(lessonsTableData);
  console.log(lessons);
  

  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const updateLessonsNumbers = async (newLessons) => {
    const lessonsToUpdate = newLessons.filter(
      (lesson) =>
        lessonsTableData?.find(({ id }) => id === lesson.id).number !==
        lesson.number
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

  const onDragEnd = ({ active, over }) => {
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
          (lesson) => lesson.key === active.id
        );
        const overIndex = prevLessons?.findIndex(
          (lesson) => lesson.key === over?.id
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
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={lessons.map((lesson) => lesson.key)}
        strategy={verticalListSortingStrategy}
      >
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "rgb(126, 140, 168)",
                headerColor: "#fff",
              },
            },
          }}
        >
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            title={() => (
              <div className={styles.tableCourseTitle}>
                <p>{courseTitle}</p>
                <p className={styles.titlePublishInfo}>
                  {isCoursePublished && "Published"}
                </p>
              </div>
            )}
            rowKey="key"
            columns={columns}
            dataSource={lessons}
            pagination={false}
            tableLayout="fixed"
            className={styles.lessonsTable}
          />
        </ConfigProvider>
      </SortableContext>
    </DndContext>
  );
};

export default LessonsTable;
