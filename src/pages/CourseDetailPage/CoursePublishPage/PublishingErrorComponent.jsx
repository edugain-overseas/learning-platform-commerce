import React from "react";
import { ConfigProvider, Table } from "antd";
import styles from "./CoursePublishPage.module.scss";
import { Link } from "react-router-dom";

const errorCodeProvider = (error) => {
  switch (error.message) {
    case "Sum for all question in test not equal its score":
      return { code: "test", ...error };
    case "Sum for all question in exam not equal its score":
      return { code: "exam", ...error };
    case "Create exam before publishing course":
      return { code: "allNoScore", ...error };
    case "Course score not equals 200":
      return { code: "all", ...error };
    default:
      return error;
  }
};

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    render: (text, record) => <Link to={`/task/${record.id}`}>{text}</Link>,
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Scheduled Time",
    dataIndex: "scheduled_time",
  },
  {
    title: "Score",
    dataIndex: "score",
  },
];

// [
//   "Create exam before publishing course",
//   "Sum for all question in exam not equal its score",
//   "Sum for all question in test not equal its score",
//   "Course score not equals 200",
// ];

const PublishingErrorComponent = ({ error, lessonsTableData }) => {
  const errorState = errorCodeProvider(error);

  const getErrortableCols = () => {
    if (errorState.code === "allNoScore") {
      return columns.filter((col) => col.dataIndex !== "score");
    }
    return columns;
  };

  const getErrorTableData = () => {
    console.log(errorState, lessonsTableData);
    switch (errorState.code) {
      case "test":
        return [
          {
            ...lessonsTableData.find(
              ({ id }) => id === errorState.test_info.lesson_id
            ),
            score: errorState.test_info.test_score,
          },
        ];
      case "exam":
        return [
          {
            ...lessonsTableData.find(
              ({ id }) => id === errorState.exam_info.lesson_id
            ),
            score: errorState.exam_info.exam_score,
          },
        ];
      case "allNoScore":
        return [...lessonsTableData].sort((a, b) => a.number - b.number);
      case "all":
        return [...lessonsTableData]
          .sort((a, b) => a.number - b.number)
          .filter(({ type }) => type === "test" || type === "exam")
          .map((lesson) => {
            const score =
              lesson.type === "test"
                ? errorState.test_info.find(
                    (test) => test.lesson_id === lesson.id
                  ).test_score
                : errorState.exam_info.exam_score;

            return {
              ...lesson,
              score,
            };
          });

      default:
        return [];
    }
  };

  const footer =
    errorState.code === "all"
      ? () => (
          <div className={styles.SumOfScoreTableFooter}>
            {errorState.test_info.reduce(
              (sum, test) => sum + test.test_score,
              0
            ) + errorState.exam_info.exam_score}
          </div>
        )
      : null;

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "rgb(126, 140, 168)",
            headerColor: "#fff",
          },
        },
      }}
    >
      <Table
        title={() => (
          <div className={styles.errorTableTitle}>{error.message}</div>
        )}
        // rowKey="key"
        columns={getErrortableCols()}
        dataSource={getErrorTableData()}
        pagination={false}
        tableLayout="fixed"
        footer={footer}
      />
    </ConfigProvider>
  );
};

export default PublishingErrorComponent;
