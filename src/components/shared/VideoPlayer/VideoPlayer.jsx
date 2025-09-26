import React, { useState } from "react";
import Skeleton from "../Skeleton/Skeleton";

const VideoPlayer = ({ file }) => {
  const [videoParams, setVideoParmas] = useState({ width: null, height: null });

  const handleLoadedMetadata = (e) => {
    const aspectRatio = e.target.videoWidth / e.target.videoHeight;

    if (aspectRatio >= 1) {
      setVideoParmas({
        width: e.target.scrollWidth,
        height: e.target.scrollWidth / aspectRatio,
      });
    } else {
      const height = (e.target.scrollWidth / 16) * 9;
      
      setVideoParmas({
        width: height * aspectRatio,
        height: height,
      });
    }
  };

  const aspectRatio = videoParams.width / videoParams.height;
  const vertical = aspectRatio < 1;


  return (
    <>
      <video
        controls
        controlsList="nodownload"
        style={{
          display: "block",
          margin: "0 auto",
          maxWidth: "100%",
          width: vertical ? videoParams.width || 0 : "100%",
          height: vertical ? videoParams.height || 0 : "auto",
        }}
        onContextMenu={(e) => e.preventDefault()}
        onLoadedMetadata={handleLoadedMetadata}
        src={file.filePath}
      />
      {(!videoParams.width || !videoParams.height) && (
        <Skeleton style={{ aspectRatio: 16 / 9 }} />
      )}
    </>
  );
};

export default VideoPlayer;
