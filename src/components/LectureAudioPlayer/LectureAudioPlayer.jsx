import React, { useRef, useState } from "react";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import { serverName } from "../../http/server";
import { ReactComponent as PlayIcon } from "../../images/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../images/icons/pause.svg";
import { ReactComponent as VoiceIcon } from "../../images/icons/voice.svg";
import { ReactComponent as VolumeIcon } from "../../images/icons/volume.svg";
import Select from "../shared/Select/Select";
import styles from "./LectureAudioPlayer.module.scss";

const getOptionsFromAudios = (audios) => {
  return audios.map((audioPath) => {
    const voiceName = audioPath.split("/").pop().split(".")[0];
    const capitalized = voiceName.charAt(0).toUpperCase() + voiceName.slice(1);
    return { label: capitalized, value: audioPath };
  });
};

const LectureAudioPlayer = ({ lectureSpeeches }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState(lectureSpeeches[0]);
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);
  const [isPlayeble, setIsPlayeble] = useState(false);

  const [messageApi, contextHolder] = useNotificationMessage();

  const handlePlay = () => {
    try {
      audioRef.current?.play();
      setIsPlaying(true);
    } catch {
      messageApi.error({
        content: "Something went wrong! Sorry for that, try again later",
      });
    }
  };
  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };
  const handleVoiceChange = async (value) => {
    setAudioSrc(value);
    try {
      audioRef.current.src = `${serverName}/${value}`;
      await audioRef.current.load();
      audioRef.current.playbackRate = rate;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
      messageApi.error({
        content: "Something went wrong! Sorry for that, try again later",
      });
    }
  };
  const handleChangeVolume = (e) => {
    const value = e.target.value;
    audioRef.current.volume = value;
    setVolume(value);
  };
  const handleDecreaseRate = () => {
    const newRate = Math.max(0.5, rate - 0.25);
    audioRef.current.playbackRate = newRate;
    setRate(newRate);
  };
  const handleIncreaseRate = () => {
    const newRate = Math.min(2, rate + 0.25);
    setRate(newRate);
    audioRef.current.playbackRate = newRate;
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <audio
        ref={audioRef}
        className={styles.audio}
        src={`${serverName}/${audioSrc}`}
        controls={false}
        onError={() => setIsPlayeble(false)}
        onLoadedMetadata={() => setIsPlayeble(true)}
      />
      <span className={styles.title}>Voice acting:</span>
      {isPlaying ? (
        <button type="button" onClick={handlePause} className={styles.playBtn}>
          <PauseIcon />
        </button>
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className={styles.playBtn}
          disabled={!isPlayeble}
        >
          <PlayIcon />
        </button>
      )}
      <Select
        onChange={handleVoiceChange}
        options={getOptionsFromAudios(lectureSpeeches)}
        placeholder={
          <>
            <VoiceIcon style={{ width: "16rem", height: "auto" }} />
          </>
        }
        wrapperStyles={{
          width: "fit-content",
          padding: "6rem",
          gap: "4rem",
          marginRight: "12rem",
        }}
        allowClear={false}
        borderless={true}
        dropDownWrapperStyles={{ maxWidth: "156rem", maxHeight: "200rem" }}
      />
      <div className={styles.volumeWrapper}>
        <VolumeIcon />
        <div className={styles.inputWrapper}>
          <input
            className={styles.volumeInput}
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleChangeVolume}
          />
          <div
            className={styles.volumeValue}
            style={{ width: `calc(${+volume} * 100%)` }}
          ></div>
        </div>
      </div>
      <div className={styles.rateWrapper}>
        <button className={styles.decrease} onClick={handleDecreaseRate}>
          <PlayIcon />
        </button>
        <span>{`${rate}x`}</span>
        <button className={styles.increase} onClick={handleIncreaseRate}>
          <PlayIcon />
        </button>
      </div>
    </div>
  );
};

export default LectureAudioPlayer;
