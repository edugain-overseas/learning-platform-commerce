import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelection } from "../../context/SelectionContext";
import { useDispatch, useSelector } from "react-redux";
import { TreeSelect } from "antd";
import { getAllLessons } from "../../redux/lesson/selectors";
import { convertToHTML } from "../../utils/convrtToHTML";
import { createNewNoteThunk } from "../../redux/user/operations";
import { ReactComponent as ChevronIcon } from "../../images/icons/dropdownArrow.svg";
import { getUserNotes } from "../../redux/user/selectors";
import Note from "./Note";
import AddChildNode from "./AddChildNode";
import NodeTitle from "./NodeTitle";
import styles from "./Notes.module.scss";
import "./TreeSelect.css";

const treeSelectStyle = {
  width: "100%",
};

const treeSelectDropdownStyles = {
  maxHeight: 400,
  overflow: "auto",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 0 10rem rgba(0, 0, 0, 0.1)",
};

const NotesPopoverContent = () => {
  const selectionText = useSelection()?.selectionText;
  const removeTheSelection = useSelection()?.removeTheSelection;
  const messageApi = useSelection()?.messageApi;

  const { taskId } = useParams();
  const userNotes = useSelector(getUserNotes);
  const lessons = useSelector(getAllLessons);
  const dispatch = useDispatch();

  const [noteTitle, setNoteTitle] = useState("");
  const [selectedNote, setSelectedNote] = useState();
  const [treeData, setTreeData] = useState([]);
  const [open, setIsOpen] = useState(false);

  const handleShowAddChildNode = (parentId) => {
    const addChildToNode = (node) => {
      if (
        node.value === parentId &&
        !node.children.some(
          (child) => child.value === `${node.value} new child`
        )
      ) {
        return {
          ...node,
          children: [
            ...node.children,
            {
              value: `${node.value} new child`,
              title: <AddChildNode parentId={node.value} />,
            },
          ],
        };
      }

      return {
        ...node,
        children: node.children?.map(addChildToNode),
      };
    };

    setTreeData((prev) => prev.map(addChildToNode));
  };

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

  useEffect(() => {
    const getNoteTreeData = (note) => ({
      key: `note-${note.note_id}`,
      value: `note-${note.note_id}`,
      title: <Note note={note} />,
      selectable: false,
    });

    const getNotesTreeData = (userNotes) =>
      userNotes.map((node) => {
        if (node.note_id) {
          return getNoteTreeData(node);
        }
        const notes = node.folder_notes
          ? node.folder_notes.map(getNoteTreeData)
          : [];
        let childNodes = [];

        if (node.children_folders && node.children_folders.length) {
          childNodes = getNotesTreeData(node.children_folders);
        }

        return {
          key: `${node.folder_id}`,
          value: node.folder_id,
          title: (
            <NodeTitle
              title={node.folder_name}
              id={node.folder_id}
              handleShowAddChildNode={handleShowAddChildNode}
            />
          ),
          children: [...notes, ...childNodes],
        };
      });

    setTreeData([
      ...getNotesTreeData(userNotes),
      {
        key: "new parent",
        value: `new parent`,
        title: <AddChildNode />,
      },
    ]);
  }, [userNotes]);

  useEffect(() => {
    const handleNotesSelectClick = () => {
      setIsOpen((prev) => !prev);
    };

    const handleClickOutsideNotesSelect = (e) => {
      const dropdownRef = document.querySelector(".ant-select-dropdown");
      if (selectRef.contains(e.target) || dropdownRef?.contains(e.target)) {
        return;
      }
      setIsOpen(false);
    };

    const selectRef = document.querySelector(".note-tree-select");

    selectRef.addEventListener("click", handleNotesSelectClick);
    window.addEventListener("click", handleClickOutsideNotesSelect);

    return () => {
      selectRef.removeEventListener("click", handleNotesSelectClick);
      window.removeEventListener("click", handleClickOutsideNotesSelect);
    };
  }, []);

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
        placeholder="Folder"
        className="note-tree-select"
        popupClassName="note-tree-select-dropdown"
        suffixIcon={<ChevronIcon className="chevronIcon" />}
        switcherIcon={<ChevronIcon className="treeChevronIcon" />}
        style={treeSelectStyle}
        dropdownStyle={treeSelectDropdownStyles}
        treeData={treeData}
        showSearch={false}
        allowClear={false}
        value={selectedNote}
        onChange={(value) => {
          setSelectedNote(value);
          setIsOpen(false);
        }}
        open={open}
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
