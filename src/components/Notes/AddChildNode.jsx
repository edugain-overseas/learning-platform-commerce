import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotesFolderThunk } from "../../redux/user/operations";
import { getUserInfo } from "../../redux/user/selectors";
import { ReactComponent as CheckIcon } from "../../images/icons/check.svg";
import styles from "./Notes.module.scss";

const AddChildNode = ({ parentId = null, deleteNode }) => {
  const inputRef = useRef();
  const [title, setTitle] = useState("");

  const studentId = useSelector(getUserInfo).studentId;

  const dispatch = useDispatch();

  const handleSaveNewChildNode = (e) => {
    e.stopPropagation();

    const nodeData = {
      student_id: studentId,
      name: title,
      parent_id: parentId,
    };

    dispatch(createNotesFolderThunk(nodeData));
  };

  return (
    <div
      className={styles.addChildNodeWrapper}
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current.focus();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        name="node-title"
        placeholder="New folder title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {title !== "" && (
        <button onClick={handleSaveNewChildNode}>
          <CheckIcon />
        </button>
      )}
    </div>
  );
};

export default AddChildNode;
