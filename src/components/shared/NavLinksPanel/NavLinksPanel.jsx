import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { navLinkActiveHandler } from "../../../utils/navLinkActiveHandler";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";
import { useNotificationMessage } from "../../../hooks/useNotificationMessage";
import styles from "./NavLinksPanel.module.scss";

export default function NavLinksPanel({ renderLinks }) {
  const [messageApi, contextHolder] = useNotificationMessage();
  const { courseId } = useParams();
  const course = useSelector(getAllCourses).find(
    (course) => course?.id === +courseId
  );

  const isExamIsBlocked =
    course?.lessons?.find((lesson) => lesson.type === "exam")?.status ===
    "blocked";

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
