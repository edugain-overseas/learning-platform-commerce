import React from "react";
import { Image } from "antd";
import { serverName } from "../../../http/sever";
// import { useSelector } from "react-redux";
// import { getIsEdit } from "../../../redux/config/configSelectors";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import noImage from "../../../images/noImage.jpeg";
import Textarea from "../Textarea/Textarea";
import { useSelector } from "react-redux";
import { getUserType } from "../../../redux/user/selectors";

const ImageGroup = ({
  imagesData,
  isDesc,
  styles = {},
  setDescription = () => {},
  handleDeleteFile = () => {},
  // handleInputBlur = () => {},
}) => {
  // const isEdit = useSelector(getIsEdit);
  const isEdit = useSelector(getUserType) === "moder";

  return (
    <div>
      <Image.PreviewGroup>
        <div className={styles.imagesWrapper}>
          {imagesData.map((imageData, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={`${serverName}/${imageData.file_path}`}
                alt={`${imageData.filename}`}
                fallback={noImage}
              />
              {isDesc && (
                <div className={styles.descWrapper}>
                  {isEdit ? (
                    <Textarea
                      value={imageData.file_description}
                      maxRows={1}
                      onChange={(value) =>
                        setDescription(imageData.filename, value)
                      }
                    />
                  ) : (
                    <p>{imageData.imageDescription}</p>
                  )}
                </div>
              )}
              {isEdit && (
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
