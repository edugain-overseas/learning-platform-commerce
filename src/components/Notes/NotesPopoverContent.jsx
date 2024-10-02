import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelection } from "../../context/SelectionContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllLessons } from "../../redux/lesson/selectors";
import { convertToHTML } from "../../utils/convrtToHTML";
import { createNewNoteThunk } from "../../redux/user/operations";
import TreeSelect from "./TreeSelect";
import styles from "./Notes.module.scss";
import "./TreeSelect.css";

const NotesPopoverContent = () => {
  const selectionText = useSelection()?.selectionText;
  const removeTheSelection = useSelection()?.removeTheSelection;
  const messageApi = useSelection()?.messageApi;

  const { taskId } = useParams();
  const lessons = useSelector(getAllLessons);
  const dispatch = useDispatch();

  const [noteTitle, setNoteTitle] = useState("");
  const [selectedNote, setSelectedNote] = useState();

  const saveNewNote = () => {
    const lectureId = lessons.find(({ id }) => id === +taskId)?.lecture_info
      ?.lecture_id;

    const noteData = {
      title: noteTitle,
      text: convertToHTML(selectionText),
      folder_id: selectedNote,
      lecture_id: lectureId,
    };

    if (noteTitle === "") {
      messageApi.error({
        content: "Note title is required!",
        duration: 3,
      });
    }

    if (!selectedNote) {
      messageApi.error({
        content: "Please select folder to save into!",
        duration: 3,
      });
    }

    if (noteTitle === "" || !selectedNote) {
      return;
    }

    dispatch(createNewNoteThunk(noteData))
      .unwrap()
      .then(() => {
        messageApi.success({
          content: "Note has been saved",
          duration: 3,
        });
        setNoteTitle("");
        setSelectedNote(null);
        removeTheSelection();
      });
  };

  return (
    <>
      <h4 className={styles.notesTitle}>Add new note</h4>
      <input
        type="text"
        className={styles.noteTitleInput}
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Note title"
      />
      <TreeSelect
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      <div className={styles.btns}>
        <button onClick={saveNewNote} disabled={selectionText === ""}>
          Save
        </button>
        <button onClick={removeTheSelection} disabled={selectionText === ""}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default NotesPopoverContent;
