import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import QuestionInput from "./shared/QuestionInput";
import ScoreInput from "./shared/ScoreInput";
import OptionsWrapper from "./shared/OptionsWrapper";
import Textarea from "../../../shared/Textarea/Textarea";
import DeleteOptionBtn from "./shared/DeleteOptionBtn";
import InputCheckbox from "../../../shared/InputCheckbox/InputCheckbox";
import styles from "../TestConstructor.module.scss";
import FileUploader from "../../../shared/Uploaders/FileUploader/FileUploader";

const QuestionWithPhoto = ({ partData, setters, maxScore, index, testScore }) => {
  return (
    <>
      <ScoreInput
        value={partData.q_score}
        setValue={(value) => setters.setQuestionProperty("q_score", value)}
        maxValue={maxScore}
        score={testScore}
      />
      <div className={styles.imageUploaderWrapper}>
        <FileUploader
          type="image"
          accept="image/*"
          uploadedFilePath={partData.image_path}
          setUploadedFilePath={(filePath) =>
            setters.setQuestionProperty("image_path", filePath)
          }
          requestConfig={{ url: "lesson/upload/file", formDataKey: "file" }}
        />
      </div>
      <div className={styles.questionWrapper}>
        <span>{`${index + 1})`}</span>
        <QuestionInput
          value={partData.q_text}
          setValue={(value) => setters.setQuestionProperty("q_text", value)}
        />
      </div>
      <OptionsWrapper
        handleAddOption={setters.addOption}
        canAddOption={partData.answers.length < 4}
      >
        {partData.answers.map((answer, index) => (
          <li key={index}>
            <span className={styles.optionLetter}>
              {getLetterVatiantsByIndex(index)}
            </span>
            <Textarea
              placeholder="Please write answer's option here..."
              value={answer.a_text}
              onChange={(value) =>
                setters.setOptionProperty(index, "a_text", value)
              }
            />
            <InputCheckbox
              className={styles.optionCheckbox}
              checked={answer.is_correct}
              onChange={(e) =>
                setters.setCorrectAnswer(index, e.target.checked)
              }
            />
            <DeleteOptionBtn
              handleDeleteOption={() => setters.deleteOption(index)}
            />
          </li>
        ))}
      </OptionsWrapper>
    </>
  );
};

export default QuestionWithPhoto;
