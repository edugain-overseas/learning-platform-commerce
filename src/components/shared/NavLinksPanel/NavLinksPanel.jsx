import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { navLinkActiveHandler } from "../../../utils/navLinkActiveHandler";
import styles from "./NavLinksPanel.module.scss";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";
import useMessage from "antd/es/message/useMessage";

export default function NavLinksPanel({ renderLinks }) {
  const [messageApi, contextHolder] = useMessage();
  const { courseId } = useParams();
  const course = useSelector(getAllCourses).find(
    (course) => course?.id === +courseId
  );

  const isExamIsBlocked =
    course?.lessons?.find((lesson) => lesson.type === "exam")?.status ===
    "blocked";

  console.log(isExamIsBlocked);

  const linkBlockedByExam = (link) =>
    link.to === "exam-certificate" && isExamIsBlocked;

  return (
    <>
      {contextHolder}
      <div className={styles.navBarWrapper}>
        {renderLinks.map((link, index) => (
          <NavLink
            key={index}
            className={({ isActive }) =>
              navLinkActiveHandler(
                linkBlockedByExam(link) ? false : isActive,
                styles
              )
            }
            to={linkBlockedByExam(link) ? null : link.to}
            onClick={
              linkBlockedByExam(link)
                ? () =>
                    messageApi.info({
                      content:
                        "You can not access this lesson becouse it is blocked",
                      duration: 3,
                    })
                : () => {}
            }
          >
            {link.content}
          </NavLink>
        ))}
      </div>
    </>
  );
}
