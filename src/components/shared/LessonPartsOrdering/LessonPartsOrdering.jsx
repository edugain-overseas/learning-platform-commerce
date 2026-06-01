import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import CommonButton from "../CommonButton/CommonButton";
import Modal from "../Modal/Modal";
import styles from "./LessonPartsOrdering.module.scss";

const LessonPartItem = ({ part, index }) => {
  const id = part.id || part._id;

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
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
          opacity: 0.5,
        }
      : {}),
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.partsItem}
    >
      <strong>№{index + 1}</strong>
      <span>{part.a_title}</span>
    </li>
  );
};

const LessonPartsOrdering = ({ type = "lecture", parts = [], setParts }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  const itemIds = parts.map((part) => part.id || part._id);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = itemIds.indexOf(active.id);
    const newIndex = itemIds.indexOf(over.id);

    const reorderedParts = arrayMove(parts, oldIndex, newIndex);

    const renumberedParts = reorderedParts.map((part, index) => ({
      ...part,
      a_number: index + 1,
    }));

    setParts(renumberedParts);
  };

  return (
    <>
      <CommonButton
        onClick={() => setIsOpen(true)}
        text="Change order"
        wrapperStyles={{ width: "100%", marginBottom: "8rem" }}
        disabled={parts?.length === 0}
      />
      {!!parts.length && (
        <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
          <DndContext
            onDragEnd={handleDragEnd}
            sensors={sensors}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={itemIds}>
              <ul className={styles.partsList}>
                {parts.map((part, index) => {
                  const partId = part.id || part.a_id;
                  return (
                    <LessonPartItem key={partId} part={part} index={index} />
                  );
                })}
              </ul>
            </SortableContext>
          </DndContext>
        </Modal>
      )}
    </>
  );
};

export default LessonPartsOrdering;
