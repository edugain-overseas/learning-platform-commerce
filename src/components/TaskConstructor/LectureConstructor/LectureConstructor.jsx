import React from "react";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useLectureConstructor } from "../../../context/LectureConstructorContext";
import { ReactComponent as TrashIcon } from "../../../images/icons/delete.svg";
import Text from "./parts/Text";
import Present from "./parts/Present";
import Video from "./parts/Video";
import Audio from "./parts/Audio";
import Picture from "./parts/Picture";
import File from "./parts/File";
import Link from "./parts/Link";
import ToolsPanel from "./ToolsPanel";
import Table from "./parts/Table";
import TaskLayout from "../../shared/TaskLayout/TaskLayout";
import styles from "./LectureConstructor.module.scss";

const Sortable = ({ children, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    // transform: transform
    //   ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    //   : undefined,
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
          pointerEvents: "none",
          backgroundColor: "rgb(252,252,252)",
        }
      : {}),
  };

  return (
    <div
      ref={setNodeRef}
      className={styles.block}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

const LectureConstructor = () => {
  const {
    blocks,
    setBlocks,
    handleAddBlock,
    handleDeleteBlock,
    getSetters,
    handleSaveLectureParts,
  } = useLectureConstructor();

  const getComponent = (block) => {
    const setters = getSetters(block);

    switch (block.a_type) {
      case "text":
        return <Text partData={block} setters={setters} />;
      case "present":
        return <Present partData={block} setters={setters} />;
      case "video":
        return <Video partData={block} setters={setters} />;
      case "audio":
        return <Audio partData={block} setters={setters} />;
      case "picture":
        return <Picture partData={block} setters={setters} />;
      case "file":
        return <File partData={block} setters={setters} />;
      case "link":
        return <Link partData={block} setters={setters} />;
      case "table":
        return <Table partData={block} setters={setters} />;
      default:
        return null;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  const onDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    setBlocks((prev) => {
      const oldIndex = prev.findIndex((b) => b.id === active.id);
      const newIndex = prev.findIndex((b) => b.id === over.id);

      const newBlocks = arrayMove(prev, oldIndex, newIndex);

      return newBlocks.map((block, index) => ({
        ...block,
        a_number: index + 1,
      }));
    });
  };

  return (
    <TaskLayout.Container>
      <TaskLayout.Content>
        <DndContext
          sensors={sensors}
          onDragEnd={onDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          autoScroll={true}
          collisionDetection={closestCenter}
        >
          <SortableContext items={blocks.map((block) => block.id)}>
            {blocks.map((block) => (
              <Sortable key={block.id} id={block.id}>
                {getComponent(block)}
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteBlock(block.id)}
                >
                  <span>Delete this block</span>
                  <TrashIcon />
                </button>
              </Sortable>
            ))}
          </SortableContext>
        </DndContext>
      </TaskLayout.Content>
      <TaskLayout.Tools>
        <ToolsPanel
          handleAddBlock={handleAddBlock}
          handleSaveLectureParts={handleSaveLectureParts}
        />
      </TaskLayout.Tools>
    </TaskLayout.Container>
  );
};

export default LectureConstructor;
