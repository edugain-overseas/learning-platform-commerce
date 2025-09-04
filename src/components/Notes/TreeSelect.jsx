import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TreeSelect as AntTreeSelect } from "antd";
import { getUserNotes } from "../../redux/user/selectors";
import { ReactComponent as ChevronIcon } from "../../images/icons/dropdownArrow.svg";
import AddChildNode from "./AddChildNode";
import NodeTitle from "./NodeTitle";
import Note from "./Note";
import "../../styles/antDesign/TreeSelect.css";

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

const TreeSelect = ({ selectedNote, setSelectedNote }) => {
  const userNotes = useSelector(getUserNotes);
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
    <AntTreeSelect
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
  );
};

export default TreeSelect;
