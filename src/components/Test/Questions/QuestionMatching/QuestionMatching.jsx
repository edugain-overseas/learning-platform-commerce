import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import Select from "../../../shared/Select/Select";
import styles from "./QuestionMatching.module.scss";

const QuestionMatching = ({ answers, setState, id, state }) => {
  const leftOptions = answers?.left || [];
  const rightOptions = answers?.right || [];

  const options = rightOptions.map(({ id }, index) => ({
    label: getLetterVatiantsByIndex(index),
    value: id,
  }));

  return (
    <div className={styles.matchWrapper}>
      <div className={styles.oprionsWrapper}>
        <ul className={styles.left}>
          {leftOptions.map(({ id, value }, index) => (
            <li key={id}>
              <p>
                {`${index + 1})`} {value}
              </p>
            </li>
          ))}
        </ul>
        <ul className={styles.right}>
          {rightOptions.map(({ id, value }, index) => (
            <li key={id}>
              <p>
                {getLetterVatiantsByIndex(index)} {value}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.selectOptionsWrapper}>
        <span className={styles.matchPointer}>Answer options:</span>
        <ul>
          {leftOptions.map(({ id: leftOptionId }, index) => {
            const currentValue = state.find(
              (answer) => answer.left_id === leftOptionId
            )?.right_id;
            return (
              <li key={leftOptionId} className={styles.answerOption}>
                <span>{`${index + 1}) = `}</span>
                <Select
                  options={options}
                  value={currentValue ? currentValue : ""}
                  bordered={false}
                  onChange={(value) => setState(id, leftOptionId, +value)}
                  placeholder=""
                  borderless={true}
                  allowClear={false}
                  wrapperStyles={{
                    backgroundColor: "transparent",
                    width: "48rem",
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuestionMatching;
