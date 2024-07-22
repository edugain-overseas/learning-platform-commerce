import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading } from "../../redux/category/selectors";
import Modal from "../shared/Modal/Modal";
import Textarea from "../shared/Textarea/Textarea";
import Spinner from "../Spinner/Spinner";
import styles from "./CategoryPicker.module.scss";
import { createCategoryThunk } from "../../redux/category/operations";

const CreateNewCategoryModal = ({ isOpenModal, setIsOpenModal }) => {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(createCategoryThunk(data)).then(setIsOpenModal(false));
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
          <button type="submit">
            <span>Create</span>
            {isLoading && <Spinner />}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateNewCategoryModal;
