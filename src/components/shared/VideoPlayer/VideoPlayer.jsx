import React, { useState } from "react";
import Skeleton from "../Skeleton/Sceleton";

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

  console.log(file);

  return (
    <>
      <video
        controls
        controlsList="nodownload"
        style={{
          display: "block",
          margin: "0 auto",
          width: videoParams.width ? videoParams.width : "100%",
          height: videoParams.height ? videoParams.height : 0,
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
