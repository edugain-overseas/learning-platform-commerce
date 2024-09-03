import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Empty } from "antd";
import { serverName } from "../../http/sever";
import { confirmLectureThunk } from "../../redux/lesson/operation";
import PDFReader from "../PDFReader/PDFReader";
import Modal from "../shared/Modal/Modal";
import VideoPlayer from "../shared/VideoPlayer/VideoPlayer";
import LinkCard from "../shared/LinkCard/LinkCard";
import ImageGroup from "../shared/ImageGroup/ImageGroup";
import DocumentLink from "../shared/DocumentLink/DocumentLink";
import Textarea from "../shared/Textarea/Textarea";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
import CompleteBtn from "../shared/CompleteBtn/CompleteBtn";
import styles from "./Lecture.module.scss";

const LectureContent = ({ lecture }) => {
  const [lectureTitle, setLectureTitle] = useState(lecture?.title || "");
  const [fullscreen, setFullscreen] = useState(false);
  const [confirmBtnState, setConfirmBtnState] = useState("default");
  const isEdit = false;

  
  const dispatch = useDispatch();
  
  const { number, courseName, status, id, course_id: courseId } = lecture;
  console.log(status, confirmBtnState);

  const lectureContent = [...lecture.lecture_info.attributes].sort(
    (itemA, itemB) => itemA.a_number - itemB.a_number
  );

  const onTitleChange = (value) => {
    console.log(value);
    const valueWithoutPrefix = value.replace(`${courseName}: `, "");
    setLectureTitle(valueWithoutPrefix);
  };

  const renderLectureContent = () =>
    lectureContent?.map((section) => {
      const {
        a_type: type,
        a_id: id,
        a_title: title,
        a_text: text,
        downloadAllowed,
        // fileName,
        // fileSize,
        hided,
        files,
        links,
      } = section;
      switch (type) {
        case "text":
          return (
            <section
              key={id}
              id={type}
              className={hided ? `${styles.section} hidden` : styles.section}
            >
              {title && (
                <h3
                  className={styles.sectionTitle}
                  dangerouslySetInnerHTML={{ __html: title }}
                ></h3>
              )}
              {text && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "present":
          const filePath = files[0].file_path;
          const encodedFilePathPresent = filePath?.replace(/ /g, "%20");
          return (
            <section
              key={id}
              id={type}
              className={
                hided ? "hidden" : `${styles.section} ${styles.sectionPDF}`
              }
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <div className={styles.pdfWrapper}>
                <PDFReader
                  pdf={`${serverName}/${encodedFilePathPresent}`}
                  setFullscreen={setFullscreen}
                  fullscreen={false}
                />
              </div>
              <Modal
                width="fit-content"
                contentWrapperStyles={{
                  padding: 0,
                  background: "none",
                  boxShadow: "none",
                }}
                isOpen={fullscreen}
                closeModal={() => setFullscreen(false)}
              >
                <PDFReader
                  pdf={`${serverName}/${encodedFilePathPresent}`}
                  setFullscreen={setFullscreen}
                  fullscreen={fullscreen}
                />
              </Modal>
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "audio":
          console.log(section);
          const encodedFilePathAudio = files[0].file_path?.replace(/ /g, "%20");
          return (
            <section
              key={id}
              id={type}
              className={
                hided ? "hidden" : `${styles.section} ${styles.sectionAudio}`
              }
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <audio
                src={`${serverName}/${encodedFilePathAudio}`}
                controls={true}
                width="true"
                height="auto"
                controlsList={downloadAllowed ? "" : "nodownload"}
              ></audio>
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "video":
          const encodedFilePathVideo = files[0].file_path?.replace(/ /g, "%20");
          return (
            <section
              key={id}
              id={type}
              className={
                hided ? "hidden" : `${styles.section} ${styles.sectionVideo}`
              }
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <div className={styles.videoWrapper}>
                <VideoPlayer
                  file={{ filePath: `${serverName}/${encodedFilePathVideo}` }}
                />
              </div>
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "file":
          return (
            <section
              key={id}
              id={type}
              className={
                hided ? "hidden" : `${styles.section} ${styles.sectionFiles}`
              }
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              {files && files.length !== 0 && (
                <div className={styles.filesWrapper}>
                  {files.map((file) => (
                    <DocumentLink
                      file={file}
                      key={file.file_id}
                      styles={styles}
                    />
                  ))}
                </div>
              )}
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "link":
          return (
            <section
              key={id}
              id={type}
              className={
                hided ? "hidden" : `${styles.section} ${styles.sectionFiles}`
              }
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              {links && links.length !== 0 && (
                <div className={styles.linksWrapper}>
                  {links.map(({ link_id, link, anchor }) => (
                    <LinkCard
                      key={link_id}
                      link={link}
                      text={anchor}
                      styles={styles}
                    />
                  ))}
                </div>
              )}
              {text && text !== "" && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        case "picture":
          return (
            <section
              key={id}
              id={type}
              className={hided ? "hidden" : styles.section}
            >
              <h3
                className={styles.sectionTitle}
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
              <ImageGroup imagesData={files} styles={styles} isDesc={true} />
              {text && (
                <div
                  className={styles.sectionContentWrapper}
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              )}
            </section>
          );
        default:
          return null;
      }
    });

  const handleConfirmLecture = () => {
    setConfirmBtnState("pending");
    dispatch(confirmLectureThunk(id)).then(() =>
      setConfirmBtnState("fulfilled")
    );
  };

  useEffect(()=>{
    if (status === 'active') {
      setConfirmBtnState('default')
    }
  },[status])

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.lectureContent}>
        <div className={styles.titleWrapper}>
          {isEdit ? (
            <Textarea
              className={styles.titleInput}
              fontSize={18}
              value={`${courseName}: ${lectureTitle}`}
              onChange={onTitleChange}
              prefixStr={`${courseName}: `}
            />
          ) : (
            <div className={styles.lectureName}>
              <span className={styles.prefix}>{courseName}: </span>
              <span className={styles.title}>{lectureTitle}</span>
            </div>
          )}
          <h2 className={styles.title}>
            <span className={styles.prefix}>Lecture №:</span>
            {number}
          </h2>
        </div>
        {isEdit ? (
          //   <LectureConstructor
          //     lectureId={lectureId}
          //     lectureContent={lectureContent.map((item) => ({
          //       ...item,
          //       id: item.attributeId,
          //     }))}
          //   />
          <div></div>
        ) : lectureContent?.length !== 0 ? (
          renderLectureContent()
        ) : (
          <Empty />
        )}
        <div className={styles.bottomNavBtnsWrapper}>
          <LessonNavigateBtn
            forward={false}
            currentNumber={lecture.number}
            courseId={courseId}
            label="Return to previous"
            width="200rem"
            height="38rem"
          />
          {status === "active" ? (
            <CompleteBtn
              onClick={handleConfirmLecture}
              state={confirmBtnState}
            />
          ) : status === "completed" ? (
            <CompleteBtn state={"fulfilled"} />
          ) : null}
          <LessonNavigateBtn
            forward={true}
            currentNumber={lecture.number}
            courseId={courseId}
            label="Move on to next"
            width="200rem"
            height="38rem"
          />
        </div>
      </div>
    </div>
  );
};

export default LectureContent;
