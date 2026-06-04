import { memo } from "react";
import { docParserBaseUrl } from "../../http/server";
import ImageGroup from "../shared/ImageGroup/ImageGroup";
import styles from "./DocumentToTaskContructor.module.scss";
import TestContent from "../Test/TestContent";

const LectureBlock = ({ block }) => {
  return (
    <section className={styles.section}>
      {block.a_title && (
        <h3
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: block.a_title }}
        ></h3>
      )}
      {block.a_type === "picture" && (
        <ImageGroup
          imagesData={block.files}
          domainName={docParserBaseUrl}
          styles={styles}
          isDesc={true}
        />
      )}
      {block.a_text && (
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: block.a_text }}
        ></p>
      )}
    </section>
  );
};

const ContentBlocks = memo(({ blocks, type, config }) => {

  return (
    <div className={`${styles.blocksContainer} ${styles[type]}`}>
      {type === "lecture" ? (
        blocks.map((block, index) => <LectureBlock key={index} block={block} />)
      ) : (
        <TestContent
          test={{
            test_data: { questions: blocks, score: config?.score },
            type,
          }}
          renderHeader={false}
          closed={true}
          wrapperStyles={{ opacity: 1 }}
          studentAnswers={blocks.map((block) => ({ ...block }))}
          isPreview={true}
        />
      )}
    </div>
  );
});

export default ContentBlocks;
