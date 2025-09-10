import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as PlayIcon } from "../../../images/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../../images/icons/pause.svg";
import { ReactComponent as PrevIcon } from "../../../images/icons/prev.svg";
import { ReactComponent as NextIcon } from "../../../images/icons/next.svg";
import { ReactComponent as VolumeIcon } from "../../../images/icons/volume.svg";
import styles from "./AudioPlayer.module.scss";
import InputRange from "../InputRange/InputRange";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = +e.target.value;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleChangeVolume = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = +newVolume;
    setVolume(newVolume);
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioData = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioData);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, []);

  return (
    <div className={styles.container}>
      <audio src={src} ref={audioRef} preload="metadata" />
      <div className={styles.controls}>
        <button className={styles.playBtn} onClick={togglePlay}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div className={styles.duration}>
          {formatTime(currentTime)}
          {" / "}
          {formatTime(duration)}
        </div>
        <div className={styles.progressContainer}>
          <InputRange
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={handleProgressChange}
          />
        </div>
        <div className={styles.volumeContainer}>
          <VolumeIcon />
          <div className={styles.inputWrapper}>
            <InputRange
              width="50rem"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleChangeVolume}
            />
            <div
              className={styles.volumeValue}
              style={{ width: `calc(${+volume} * 100%)` }}
            ></div>
          </div>
        </div>
        <div className={styles.rateContainer}>
          <button className={styles.decrease} onClick={handleDecreaseRate}>
            <PrevIcon />
          </button>
          <span>{`${rate}x`}</span>
          <button className={styles.increase} onClick={handleIncreaseRate}>
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
