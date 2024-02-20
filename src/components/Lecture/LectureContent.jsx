import React, { useState } from "react";
import { serverName } from "../../http/sever";
import PDFReader from "../PDFReader/PDFReader";
import Modal from "../shared/Modal/Modal";
import VideoPlayer from "../shared/VideoPlayer/VideoPlayer";
import LinkCard from "../shared/LinkCard/LinkCard";
import ImageGroup from "../shared/ImageGroup/ImageGroup";
import styles from "./Lecture.module.scss";
import DocumentLink from "../shared/DocumentLink/DocumentLink";
import { Empty } from "antd";
import Textarea from "../shared/Textarea/Textarea";

// const a = [
//   {
//     a_id: 1,
//     a_type: "text",
//     a_title: "Introduction Section",
//     a_number: 1,
//     a_text:
//       "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться",
//     hidden: false,
//     files: [],
//     links: [],
//   },
//   {
//     a_id: 2,
//     a_type: "link",
//     a_title: "Link Section",
//     a_number: 2,
//     a_text:
//       "Здесь ваш текст.. Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам lorem ipsum сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения",
//     hidden: false,
//     files: [],
//     links: [
//       {
//         link_id: 1,
//         link: "https://ru.lipsum.com/",
//         anchor: "https://ru.lipsum.com/",
//       },
//       {
//         link_id: 2,
//         link: "http://127.0.0.1:8000/",
//         anchor: "swagger",
//       },
//     ],
//   },
//   {
//     a_id: 3,
//     a_type: "present",
//     a_title: "File section",
//     a_number: 3,
//     a_text:
//       "За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).",
//     hidden: false,
//     files: [
//       {
//         file_id: 1,
//         filename: "sample.pdf",
//         file_path: "static/lessons/19-02-2024/sample.pdf",
//         file_size: 3028,
//         file_description: "Description for file",
//         download_allowed: false,
//       },
//     ],
//     links: [],
//   },
// ];

const LectureContent = ({ lecture }) => {
  const [lectureTitle, setLectureTitle] = useState(lecture?.title || "");
  //   const [lectureDesc, setLectureDesc] = useState(lecture?.description || "");
  const [fullscreen, setFullscreen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const { lessonId: lectureId } = lecture;

  const lectureContent = lecture.content;

  const courseName = "Marketing";
  console.log(lectureContent);

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
        //   const encodedFilePathPresent = filePath?.replace(/ /g, "%20");
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
                  // pdf={`${serverName}${encodedFilePathPresent}`}
                  pdf="https://pdfobject.com/pdf/sample.pdf"
                  setFullscreen={setFullscreen}
                  fullscreen={fullscreen}
                />
              </div>
              <Modal
                width="fit-content"
                contentWrapperStyles={{padding: 0, background: 'none', boxShadow: 'none'}}
                isOpen={fullscreen}
                closeModal={() => setFullscreen(false)}
              >
                <PDFReader
                  //   pdf={`${serverName}${encodedFilePathPresent}`}
                  pdf="https://pdfobject.com/pdf/sample.pdf"
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
          const encodedFilePathAudio = filePath?.replace(/ /g, "%20");
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
                src={`${serverName}${encodedFilePathAudio}`}
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
          const encodedFilePathVideo = filePath?.replace(/ /g, "%20");
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
                <VideoPlayer file={{ filePath: encodedFilePathVideo }} />
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

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.lectureContent}>
        <button onClick={() => setIsEdit((prev) => !prev)}>change</button>
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
            {lectureId}
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
      </div>
    </div>
  );
};

export default LectureContent;
