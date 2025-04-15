import React, { useState } from "react";
import { ReactComponent as PlusIcon } from "../../images/icons/plus.svg";
import styles from "./CreateCategoryBtn.module.scss";
import CategoryModal from "../CategoryModal/CategoryModal";

const CreateCategoryBtn = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <button
        className={styles.createCategoryBtn}
        onClick={() => setIsOpenModal(true)}
      >
        <PlusIcon />
        <span>Create new category</span>
      </button>
      <CategoryModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  );
};

export default CreateCategoryBtn;
