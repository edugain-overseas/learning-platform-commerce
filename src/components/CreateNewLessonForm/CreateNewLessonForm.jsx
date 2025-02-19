import React, { useState } from "react";
import useMessage from "antd/es/message/useMessage";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLessonInCourseThunk } from "../../redux/course/operations";
import Select from "../shared/Select/Select";
import FileUploader from "../shared/Uploaders/FileUploader/FileUploader";
import Spinner from "../Spinner/Spinner";
import styles from "./CreateNewLessonForm.module.scss";
import { getIsLoading } from "../../redux/course/selectors";

const CreateNewLessonForm = ({ lessonNumber, closeModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [lessonType, setLessonType] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const [messageApi, contextHolder] = useMessage();
  const { courseId } = useParams();
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();

  const onLessonTypeChange = (value) => {
    console.log(value);
    if (value === "test") {
      setValue("scheduled_time", "80");
    }
    setLessonType(value);
  };

  const onSubmit = (data) => {
    if (!lessonType) {
      messageApi.error({
        content: "Please select lesson type",
        duration: 3,
      });
      return;
    }

    if (!uploadedImage) {
      messageApi.error({
        content: "Please upload lesson poster",
        duration: 3,
      });
      return;
    }

    const lessonData = {
      ...data,
      course_id: +courseId,
      image_path: uploadedImage,
      number: lessonNumber ? lessonNumber : 1,
      type: lessonType,
    };

    dispatch(createLessonInCourseThunk(lessonData)).then(() => {
      setInitialState();
      closeModal();
      reset();
    });
  };

  const setInitialState = () => {
    setLessonType(undefined);
    setUploadedImage(undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {contextHolder}
      <Select
        options={[
          { value: "lecture", label: "Lecture" },
          { value: "test", label: "Test" },
          { value: "exam", label: "Exam" },
        ]}
        value={lessonType}
        placeholder="Select lesson type"
        wrapperStyles={{ width: "100%", fontSize: "16rem" }}
        allowClear={false}
        onChange={onLessonTypeChange}
        dropDownWrapperStyles={{ fontSize: "16rem" }}
      />
      <div className={styles.inputWrapper}>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          placeholder="Lesson title"
        />
        {errors.title && (
          <span className={styles.error}>{errors.title.message}</span>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          {...register("description", { required: "Description is required" })}
          placeholder="Lesson description"
        />
        {errors.description && (
          <span className={styles.error}>{errors.description.message}</span>
        )}
      </div>
      <label className={styles.scheduledTime}>
        Scheduled time:
        <input
          type="number"
          {...register("scheduled_time", {
            required: "Schedule time is required",
            minLength: 1,
            maxLength: 3,
          })}
        />
        minutes
        {errors.scheduled_time && (
          <span className={styles.error}>{errors.scheduled_time.message}</span>
        )}
      </label>

      <div className={styles.lessonImage}>
        <FileUploader
          type="image"
          accept="image/*"
          uploadedFilePath={uploadedImage}
          setUploadedFilePath={setUploadedImage}
          requestConfig={{ url: "/lesson/upload/file", formDataKey: "file" }}
        />
      </div>
      <button type="submit" className={styles.createLessonBtn}>
        {isLoading ? <Spinner /> : <span>Create</span>}
      </button>
    </form>
  );
};
export default CreateNewLessonForm;
