import React from "react";
import { Image } from "antd";
import { serverName } from "../../../http/server";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import noImage from "../../../images/noImage.webp";
import Textarea from "../Textarea/Textarea";

const ImageGroup = ({
  imagesData,
  isDesc,
  styles = {},
  setDescription = () => {},
  handleDeleteFile = () => {},
  // handleInputBlur = () => {},
  disabled = true,
}) => {
  return (
    <div>
      <Image.PreviewGroup>
        <div className={`${styles.imagesWrapper} ${styles[`grid-${imagesData?.length}`]}`}>
          {imagesData.map((imageData, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={`${serverName}/${imageData.file_path}`}
                alt={`${imageData.filename}`}
                fallback={noImage}
              />
              {isDesc && (
                <div className={styles.descWrapper}>
                  {!disabled ? (
                    <Textarea
                      value={imageData.file_description}
                      maxRows={1}
                      onChange={(value) =>
                        setDescription(imageData.filename, value)
                      }
                    />
                  ) : (
                    <p>{imageData.file_description}</p>
                  )}
                </div>
              )}
              {!disabled && (
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteFile(imageData.filename)}
                >
                  <TrashIcon className={styles.deleteIcon} />
                </button>
              )}
            </div>
          ))}
        </div>
      </Image.PreviewGroup>
    </div>
  );
};

export default ImageGroup;
