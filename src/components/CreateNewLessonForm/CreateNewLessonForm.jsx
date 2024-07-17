import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "../shared/Select/Select";
import styles from "./CreateNewLessonForm.module.scss";
// import ImageUploader from "../shared/Uploaders/ImageUploader/ImageUploader";
import FileUploader from "../shared/Uploaders/FileUploader/FileUploader";

const CreateNewLessonForm = () => {
  const { register, handleSubmit } = useForm();
  const [lessonType, setLessonType] = useState();
  const [uploadedImage, setUploadedImage] = useState();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSumbit={handleSubmit(onSubmit)} className={styles.form}>
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
        onChange={setLessonType}
        dropDownWrapperStyles={{ fontSize: "16rem" }}
      />
      <input
        type="text"
        {...register("title", { required: true })}
        placeholder="Lesson title"
      />
      <input
        type="text"
        {...register("descripton", { required: true })}
        placeholder="Lesson description"
      />
      <label className={styles.scheduledTime}>
        Scheduled time:
        <input
          type="number"
          {...register("scheduled_time", {
            required: true,
            minLength: 1,
            maxLength: 3,
          })}
        />
        minutes
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
        Create
      </button>
    </form>
  );
};
export default CreateNewLessonForm;
