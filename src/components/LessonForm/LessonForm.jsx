import React, { useState } from "react";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLessonInCourseThunk } from "../../redux/course/operations";
import { updateLessonThunk } from "../../redux/lesson/operation";
import { getIsLoading } from "../../redux/course/selectors";
import { getIsLoading as getIsLessonStateLoading } from "../../redux/lesson/selectors";
import Select from "../shared/Select/Select";
import FileUploader from "../shared/Uploaders/FileUploader/FileUploader";
import Spinner from "../Spinner/Spinner";
import styles from "./LessonForm.module.scss";

const LessonForm = ({ lessonNumber, closeModal, lessonData }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: lessonData ? lessonData : {},
  });

  const [lessonType, setLessonType] = useState(
    lessonData ? lessonData.type : undefined
  );
  const [uploadedImage, setUploadedImage] = useState(
    lessonData ? lessonData.image_path : undefined
  );
  const [messageApi, contextHolder] = useNotificationMessage();
  const { courseId } = useParams();
  const isLoading = useSelector(getIsLoading);
  const isLessonStateLoading = useSelector(getIsLessonStateLoading);
  const dispatch = useDispatch();

  const onLessonTypeChange = (value) => {
    console.log(value);
    if (value === "test" || value === "exam") {
      setValue("scheduled_time", "80");
    }
    setLessonType(value);
  };

  const onSubmit = async (data) => {
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

    try {
      if (!lessonData) {
        const lessonData = {
          ...data,
          course_id: +courseId,
          image_path: uploadedImage,
          number: lessonNumber ? lessonNumber : 1,
          type: lessonType,
        };
        await dispatch(createLessonInCourseThunk(lessonData)).unwrap();
        setInitialState();
        reset();
      } else {
        const newLessonData = {
          ...data,
          image_path: uploadedImage,
        };
        await dispatch(
          updateLessonThunk({
            courseId: +courseId,
            updatedLesson: { id: lessonData.id, ...newLessonData },
          })
        ).unwrap();
        messageApi.success({
          content: "Lesson was successfully updated.",
          duration: 3,
        });
      }

      closeModal();
    } catch (error) {
      if (error.status === 403) {
        messageApi.error({
          content: error.message,
          duration: 5,
        });
      }
    }
  };

  const setInitialState = () => {
    setLessonType(undefined);
    setUploadedImage(undefined);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
      className={styles.form}
    >
      {contextHolder}
      <Select
        options={[
          { value: "lecture", label: "Lecture" },
          { value: "test", label: "Test" },
          { value: "exam", label: "Exam" },
        ]}
        value={lessonType}
        placeholder="Select lesson type"
        wrapperStyles={{
          width: "100%",
          fontSize: "16rem",
          pointerEvents: lessonData ? "none" : "auto",
        }}
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
          disabled={lessonType === "exam"}
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
        {(isLoading || isLessonStateLoading) ? (
          <Spinner />
        ) : (
          <span>{lessonData ? "Update" : "Create"}</span>
        )}
      </button>
    </form>
  );
};
export default LessonForm;
