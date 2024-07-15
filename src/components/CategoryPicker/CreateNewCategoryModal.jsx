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
        <span>New category</span>
      </div>
      <div className={styles.modalBody}>
        <form onSubmit={handleFormSubmit}>
          <Textarea
            maxRows={1}
            placeholder="Category title"
            {...register("title", { required: true })}
            fontSize={20}
          />
          {errors.title && <span>This field is required</span>}
          <Textarea
            minRows={5}
            maxRows={10}
            placeholder="Category description"
            {...register("description", { required: true })}
            fontSize={16}
          />
          {errors.description && <span>This field is required</span>}
          <button type="submit">Create</button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateNewCategoryModal;
