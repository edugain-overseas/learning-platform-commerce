import React, { memo } from "react";
import styles from "./DocumentToTaskContructor.module.scss";

const Block = memo(({ block }) => {
  return (
    <div>
      <p>{block.content}</p>
    </div>
  );
});

const ContentBlocks = ({ contentBlocks }) => {
  console.log("render");

  return (
    <div className={styles.blocksContainer}>
      {contentBlocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
};

export default ContentBlocks;
