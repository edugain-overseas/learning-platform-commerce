import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import styles from "./coursePublishPage.module.scss";

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

const LessonsTable = ({ lessonsTableData, courseTitle }) => {
  const [lessons, setLessons] = useState(lessonsTableData);

  console.log(lessons);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setLessons((prevLessons) => {
        const activeIndex = prevLessons.findIndex(
          (lesson) => lesson.key === active.id
        );
        const overIndex = prevLessons.findIndex(
          (lesson) => lesson.key === over?.id
        );
        const newLessons = arrayMove(prevLessons, activeIndex, overIndex).map(
          (lesson, index) => ({
            ...lesson,
            number: index + 1,
          })
        );
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
            title={() =>
              courseTitle ? (
                <div className={styles.tableCourseTitle}>{courseTitle}</div>
              ) : null
            }
            rowKey="key"
            columns={columns}
            dataSource={lessons}
            pagination={false}
            tableLayout="fixed"
          />
        </ConfigProvider>
      </SortableContext>
    </DndContext>
  );
};

export default LessonsTable;
