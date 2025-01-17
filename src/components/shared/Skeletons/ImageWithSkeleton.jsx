import React, { useState, useEffect } from "react";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./Skeletons.module.scss";

const ImageWithSkeleton = ({ src, alt, wrapperClassname, imageClassname }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const img = new Image();
        img.src = src;

        await img.decode();

        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    loadImage();
  }, [src]);

  return (
    <div className={`${styles.imageSkeleton} ${wrapperClassname}`}>
      {!isLoaded && (
        <Skeleton
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
          }}
        />
      )}

      <img
        src={src}
        alt={alt}
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
        className={imageClassname}
      />
    </div>
  );
};

export default ImageWithSkeleton;
