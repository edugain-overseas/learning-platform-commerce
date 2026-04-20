import { memo } from "react";
import { docParserBaseUrl } from "../../http/server";
import ImageGroup from "../shared/ImageGroup/ImageGroup";
import styles from "./DocumentToTaskContructor.module.scss";

const Block = ({ block }) => {
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

const ContentBlocks = memo(({ blocks }) => {
  console.log("render");

  return (
    <div className={styles.blocksContainer}>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
});

export default ContentBlocks;
