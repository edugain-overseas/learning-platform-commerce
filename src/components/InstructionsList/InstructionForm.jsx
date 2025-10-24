import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as CrossIcon } from "../../images/icons/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category/selectors";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import {
  createInstructionThunk,
  editInstructionThunk,
} from "../../redux/instruction/operations";
import FileUploader from "../shared/Uploaders/FileUploader/FileUploader";
import RichInput from "../shared/RichInput";
import DocumentLink from "../shared/DocumentLink/DocumentLink";
import Select from "../shared/Select/Select";
import styles from "./InstructionsList.module.scss";

const selectWrapperStyles = {
  width: "100%",
  fontSize: "18rem",
  lineHeight: "1.42",
  position: "relative",
};

const selectDropDownWrapperStyles = {
  fontSize: "16rem",
  lineHeight: "1.42",
};

const InstructionForm = ({
  edit = false,
  type = "general",
  afterSubmit = () => {},
  defaultValues,
}) => {
  const [files, setFiles] = useState(defaultValues ? defaultValues.files : []);
  const [categoryId, setCategoryId] = useState(defaultValues?.category_id);
  const [messageApi, contextHolder] = useNotificationMessage();
  const dispatch = useDispatch();

  const categoryOptions = useSelector(getAllCategories).map((category) => ({
    label: category.title,
    value: category.id,
  }));

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues
      ? {
          name: defaultValues.name,
          title: defaultValues.title,
          text: defaultValues.text,
        }
      : {},
  });

  const onSubmit = async (data) => {
    if (type === "course" && !categoryId) {
      setError("categoryId", {
        type: "required",
        message: "Please select category",
      });
      return;
    }

    const instructionData = {
      type,
      ...data,
      files,
    };

    if (type === "course") {
      instructionData.category_id = +categoryId;
    }

    try {
      await dispatch(
        defaultValues
          ? editInstructionThunk({
              id: defaultValues.id,
              ...instructionData,
            })
          : createInstructionThunk(instructionData)
      ).unwrap();

      messageApi.success({
        content: `Instruction was successfully ${
          defaultValues ? "updated" : "created"
        }!`,
        duration: 2.5,
      });
      setCategoryId();
      setFiles([]);
      reset();
      afterSubmit();
    } catch (error) {
      messageApi.error({
        content: "Something went wrong!",
        duration: 2.5,
      });
    }
  };

  const addFile = (fileData) => setFiles((prev) => [...prev, fileData]);

  const deleteFile = (filePath) =>
    setFiles((prev) => prev.filter(({ file_path }) => file_path !== filePath));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.instructionForm}>
      {contextHolder}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          {...register("name", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
          placeholder="Write instruction name here..."
          className={styles.name}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>
      {type === "course" && (
        <div style={{ position: "relative", margin: "0 0 32rem" }}>
          <Select
            placeholder="Select category"
            value={categoryId}
            onChange={(value) => {
              clearErrors("categoryId");
              setCategoryId(value);
            }}
            options={categoryOptions}
            wrapperStyles={selectWrapperStyles}
            dropDownWrapperStyles={selectDropDownWrapperStyles}
          />
          {errors.categoryId && (
            <p className={styles.error}>{errors.categoryId.message}</p>
          )}
        </div>
      )}
      <div className={styles.contentWrapper}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            {...register("title")}
            placeholder="Write title here..."
          />
        </div>
        <RichInput
          name="text"
          control={control}
          placeholder="Write text here..."
        />
        <ul className={styles.uploadedFiles}>
          {files.map((file) => (
            <li key={file.file_path}>
              <DocumentLink file={file} />
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => deleteFile(file.file_path)}
              >
                <CrossIcon />
              </button>
            </li>
          ))}
        </ul>
        <FileUploader
          type="doc"
          accept="*/*"
          className={styles.uploaderWrapper}
          requestConfig={{
            url: "/instruction/upload",
            formDataKey: "file",
          }}
          setUploadedFile={addFile}
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default InstructionForm;
