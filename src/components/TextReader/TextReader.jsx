import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as PlayIcon } from "../../images/icons/play.svg";
import { ReactComponent as StopIcon } from "../../images/icons/pause.svg";
import { ReactComponent as VoiceIcon } from "../../images/icons/voice.svg";
import { ReactComponent as VolumeIcon } from "../../images/icons/volume.svg";
// import { ReactComponent as ArrowLeftIcon } from "../../images/icons/volume.svg";
// import { ReactComponent as ArowRightIcon } from "../../images/icons/volume.svg";
import styles from "./TextReader.module.scss";
import Select from "../shared/Select/Select";

const getOptionsFromVoices = (voices) =>
  voices.map((voice) => ({ label: voice.name, value: voice }));

const formatTextToRead = (text) => {
  const chunks = text.split(" ");
  const marketChunks = chunks.map(
    (chunk, index) => chunk + `<mark name="point${index + 1}"/>`
  );
  console.log(marketChunks.join(" "));
  return chunks.join(" ");
};

const TextReader = ({ textToRead = "Hello world" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState("1");
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const synth = useRef(window.speechSynthesis);
  const utterance = useRef(null);

  useEffect(() => {
    const updateVoices = () => {
      const voices = synth.current.getVoices();
      const googleVoices = voices.filter(({ name }) => name.includes("Google"));
      const otherVoices = voices.filter(({ name }) => !name.includes("Google"));
      const sortedVoices = [...googleVoices, ...otherVoices];
      setVoices(sortedVoices);
      setSelectedVoice(sortedVoices[0]);
    };

    synth.current.addEventListener("voiceschanged", updateVoices);

    return () => {
      synth.current.removeEventListener("voiceschanged", updateVoices);
      // eslint-disable-next-line
      synth.current.cancel();
    };
  }, []);

  useEffect(() => {
    const synthRef = synth.current;

    const handleBeforeUnload = () => {
      synthRef.cancel();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handlePlay = () => {
    if (!utterance.current) {
      utterance.current = new SpeechSynthesisUtterance(
        formatTextToRead(textToRead)
      );
      utterance.current.voice = selectedVoice;
      utterance.current.volume = +volume;
      utterance.current.rate = rate;

      utterance.current.onend = (event) => {
        console.log(event);
        setIsPlaying(false);
        synth.current.cancel();
        utterance.current = null;
      };

      utterance.current.onerror = (event) => {
        console.log(event);
      };

      utterance.current.onboundary = (event) => {
        console.log(event);
      };

      utterance.current.onpause = (event) => {
        console.log(event);
      };

      utterance.current.onresume = (event) => {
        console.log(event);
      };

      utterance.current.onstart = (event) => {
        console.log(event);
      };

      synth.current.speak(utterance.current);
    } else {
      synth.current.resume();
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (utterance.current) {
      synth.current.pause();
    }
  };
  const handleChangeVolume = (e) => {
    const { value } = e.target;
    setVolume(value);
  };
  const handleIncreaseRate = () => {
    if (rate < 2) {
      setRate((prev) => prev + 0.25);
    }
  };
  const handleDecreaseRate = () => {
    if (rate > 0.25) {
      setRate((prev) => prev - 0.25);
    }
  };
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Voice acting:</span>
      {isPlaying ? (
        <button type="button" onClick={handlePause} className={styles.playBtn}>
          <StopIcon />
        </button>
      ) : (
        <button type="button" onClick={handlePlay} className={styles.playBtn}>
          <PlayIcon />
        </button>
      )}
      <Select
        onChange={setSelectedVoice}
        options={getOptionsFromVoices(voices)}
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

export default TextReader;
