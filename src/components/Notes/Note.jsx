import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";
import { deleteNoteThunk } from "../../redux/user/operations";
import { useSelection } from "../../context/SelectionContext";
import { ReactComponent as NoteIcon } from "../../images/icons/document-text.svg";
import { ReactComponent as DeleteIcon } from "../../images/icons/trashRounded.svg";
import styles from "./Notes.module.scss";
import "./Popconfirm.css";

const Note = ({ note }) => {
  const messageApi = useSelection()?.messageApi;
  const dispatch = useDispatch();
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);

  const handleDeleteNote = (e) => {
    e.stopPropagation();

    setConfirmDeleteLoading(true);

    dispatch(deleteNoteThunk(note.note_id))
      .unwrap()
      .then(() => {
        messageApi.success({
          content: "Note has been deleted.",
          duration: 3,
        });
      })
      .finally(() => setConfirmDeleteLoading(false));
  };
  return (
    <>
      <div key={note.note_id} className={styles.note}>
        <span className={styles.noteTitle}>
          <NoteIcon />
          <span>{note.title}</span>
        </span>
        <Popconfirm
          title="Delete the note"
          description="Are you sure to delete this note?"
          onConfirm={handleDeleteNote}
          onCancel={(e) => e.stopPropagation()}
          okText="Yes"
          okButtonProps={{
            loading: confirmDeleteLoading,
          }}
          cancelText="No"
          overlayClassName="notes-popconfirm"
        >
          <button className={styles.deleteNodeBtn}>
            <DeleteIcon />
          </button>
        </Popconfirm>
      </div>
    </>
  );
};

export default Note;
