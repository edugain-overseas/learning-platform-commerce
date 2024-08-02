import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../../images/icons/plus.svg";
import styles from "./CreateNewCourseItem.module.scss";

const CreateNewCourseItem = () => {
  return (
    <li className={styles.courseCard}>
      <Link className={styles.courseLink} to={`/course/constructor/new`}>
        <button className={styles.createBtn}>
          <PlusIcon />
          <span>Create new course</span>
        </button>
      </Link>
    </li>
  );
};

export default CreateNewCourseItem;
