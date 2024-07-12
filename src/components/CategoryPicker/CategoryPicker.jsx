import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category/selectors";
import { ReactComponent as PlusIcon } from "../../images/icons/plusRounded.svg";
import Select from "../shared/Select/Select";
import styles from "./CategoryPicker.module.scss";
import CreateNewCategoryModal from "./CreateNewCategoryModal";

const CategoryPicker = ({ value, setValue }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const categories = useSelector(getAllCategories);

  const selectCategoryOptions = categories.map(({ id, title }) => ({
    value: id,
    label: title,
  }));

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Category:</span>
      <Select
        placeholder="Category"
        value={value}
        onChange={setValue}
        options={selectCategoryOptions}
        allowClear={false}
        wrapperStyles={{
          flexGrow: 1,
          fontSize: "20rem",
        }}
        dropDownWrapperStyles={{
          fontSize: "16rem",
        }}
      />

      <button
        type="button"
        className={styles.createNewCategoryBtn}
        onClick={() => setIsOpenModal(true)}
      >
        <PlusIcon title="Create new category" />
      </button>
      <CreateNewCategoryModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
};

export default CategoryPicker;
