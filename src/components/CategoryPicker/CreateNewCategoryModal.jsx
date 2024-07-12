import React from "react";
import Modal from "../shared/Modal/Modal";
import styles from "./CategoryPicker.module.scss";
import { useForm } from "react-hook-form";
import Textarea from "../shared/Textarea/Textarea";

const CreateNewCategoryModal = ({ isOpenModal, setIsOpenModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFormSubmit = (e) => {
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };

  return (
    <Modal isOpen={isOpenModal} closeModal={() => setIsOpenModal(false)}>
      <div className={styles.modalHeader}>
        <span>Create new category</span>
      </div>
      <div className={styles.modalBody}>
        <form onSubmit={handleFormSubmit}>
          <Textarea
            maxRows={1}
            placeholder="Category title"
            {...register("title", { required: true })}
          />
          {errors.title && <span>This field is required</span>}
          <Textarea
            maxRows={5}
            placeholder="Category description"
            {...register("description", { required: true })}
          />
          {errors.description && <span>This field is required</span>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateNewCategoryModal;
