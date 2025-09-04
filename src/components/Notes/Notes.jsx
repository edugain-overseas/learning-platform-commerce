import React, { useState } from "react";
import { Popover } from "antd";
import { useSelection } from "../../context/SelectionContext";
import { ReactComponent as NoteIcon } from "../../images/icons/note.svg";
import NotesPopoverContent from "./NotesPopoverContent";
import styles from "./Notes.module.scss";
import "../../styles/antDesign/Popover.css";

const Notes = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const getSelection = useSelection()?.getSelection;

  const handleOpenChange = (newOpen) => {
    if (newOpen === true) {
      getSelection();
    }
    setIsOpenPopover(newOpen);
  };

  return (
    <div className={styles.note}>
      <span>The note:</span>
      <Popover
        open={isOpenPopover}
        onOpenChange={handleOpenChange}
        trigger={"click"}
        content={<NotesPopoverContent />}
        title={null}
        className="notes-popover"
        placement="bottom"
        arrow={false}
        rootClassName="notes-popover"
      >
        <button className={styles.openNotesBtn}>
          <NoteIcon />
        </button>
      </Popover>
    </div>
  );
};

export default Notes;
