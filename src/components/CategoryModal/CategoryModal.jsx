import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading } from "../../redux/category/selectors";
import Modal from "../shared/Modal/Modal";
import RichInput from "../shared/RichInput";
import Textarea from "../shared/Textarea/Textarea";
import Spinner from "../Spinner/Spinner";
import styles from "./CategoryModal.module.scss";
import useMessage from "antd/es/message/useMessage";
import {
  createCategoryThunk,
  updateCategoryThunk,
} from "../../redux/category/operations";

const CategoryModal = ({
  isOpenModal,
  setIsOpenModal,
  categoryDefaultData,
}) => {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = useMessage();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: categoryDefaultData ? categoryDefaultData.title : "",
      certificate_info: categoryDefaultData
        ? categoryDefaultData.certificate_info
        : "",
      description: categoryDefaultData ? categoryDefaultData.description : "",
    },
  });

  const onSubmit = async (data) => {
    const handleSuccessRequest = () => {
      messageApi.success({
        content: `Category ${data.title} was successfully ${
          categoryDefaultData ? "updated" : "created"
        }`,
      });
      setIsOpenModal(false);
    };
    console.log(data);
    dispatch(
      categoryDefaultData
        ? updateCategoryThunk({
            categoryId: categoryDefaultData.id,
            updatedCategoryData: data,
          })
        : createCategoryThunk(data)
    )
      .unwrap()
      .then(handleSuccessRequest);
  };

  const handleFormSubmit = (e) => {
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };

  return (
    <>
      {contextHolder}
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
            <div className={styles.richInputWrapper}>
              <Controller
                name="certificate_info"
                control={control}
                render={() => (
                  <RichInput
                    control={control}
                    name="certificate_info"
                    placeholder="Certificate info"
                  />
                )}
              ></Controller>
              {errors.cerficate_info && <span>This field is required</span>}
            </div>
            <Textarea
              minRows={5}
              maxRows={10}
              placeholder="Category description"
              {...register("description", { required: true })}
              fontSize={16}
            />
            {errors.description && <span>This field is required</span>}

            <button type="submit">
              <span>{categoryDefaultData ? "Update" : "Create"}</span>
              {isLoading && <Spinner />}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CategoryModal;
