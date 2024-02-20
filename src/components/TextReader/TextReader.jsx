import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as PlayIcon } from "../../images/icons/play.svg";
import { ReactComponent as StopIcon } from "../../images/icons/pause.svg";
import { ReactComponent as VoiceIcon } from "../../images/icons/voice.svg";
import { ReactComponent as VolumeIcon } from "../../images/icons/volume.svg";
import Select from "../shared/Select/Select";
import styles from "./TextReader.module.scss";

const filterVoices = (voices, lang) =>
  voices
    .filter(({ name }) => !name.includes("Google"))
    .filter(({ lang: language }) => {
      if (lang === "rus") {
        return language.includes("ru");
      }
      return language.includes(lang);
    });

const getOptionsFromVoices = (voices) =>
  voices.map((voice) => ({ label: voice.name, value: voice }));

const TextReader = ({ textToRead = "", lang = "" }) => {
  const synth = useRef(window.speechSynthesis);
  const utterance = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState("1");
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState(() =>
    filterVoices(synth.current.getVoices(), lang)
  );
  const [selectedVoice, setSelectedVoice] = useState(
    filterVoices(synth.current.getVoices(), lang)[0]
  );
  const [charIndex, setCharIndex] = useState(0);
  const [currentText, setCurrentText] = useState(textToRead);


  useEffect(() => {
    const updateVoices = () => {
      console.log("voice changed");
      const voices = synth.current.getVoices();
      setVoices(filterVoices(voices, lang));
      setSelectedVoice(filterVoices(voices, lang)[0]);
    };

    if (synth.current.addEventListener) {
      synth.current.onvoiceschanged = updateVoices;
    } else {
      console.error(
        "Synthesis API on Safari does not support addEventListener"
      );
    }

    return () => {
      if (synth.current.removeEventListener) {
        // eslint-disable-next-line
        synth.current.removeEventListener("voiceschanged", updateVoices);
      }
      // eslint-disable-next-line
      synth.current.cancel();
    };
  }, [lang]);

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

  const handlePlay = (newText, newVolume, newRate, newVoice) => {
    if (!utterance.current) {
      utterance.current = new SpeechSynthesisUtterance(
        newText ? newText : textToRead
      );
      utterance.current.voice = newVoice ? newVoice : selectedVoice;
      utterance.current.volume = newVolume ? +newVolume : +volume;
      utterance.current.rate = newRate ? newRate : rate;

      utterance.current.onend = (event) => {
        setIsPlaying(false);
        synth.current.cancel();
        utterance.current = null;
      };

      utterance.current.onboundary = (event) => {
        setCharIndex(event.charIndex);
      };

      utterance.current.onstart = (event) => {
        const { text } = event.target;
        setCurrentText(text);
      };
      console.log(utterance.current.voice);
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

    if (utterance.current) {
      synth.current.cancel();
      utterance.current = null;
      const newText = currentText.slice(charIndex);
      handlePlay(newText, value);
    }
  };
  const handleIncreaseRate = () => {
    if (rate < 2) {
      setRate((prev) => prev + 0.25);
      if (utterance.current) {
        synth.current.cancel();
        utterance.current = null;
        const newText = currentText.slice(charIndex);
        handlePlay(newText, volume, rate + 0.25);
      }
    }
  };
  const handleDecreaseRate = () => {
    if (rate > 0.5) {
      setRate((prev) => prev - 0.25);
      if (utterance.current) {
        synth.current.cancel();
        utterance.current = null;
        const newText = currentText.slice(charIndex);
        handlePlay(newText, volume, rate - 0.25);
      }
    }
  };
  const handleVoiceChange = (value) => {
    setSelectedVoice(value);
    if (utterance.current) {
      synth.current.cancel();
      utterance.current = null;
      const newText = currentText.slice(charIndex);
      handlePlay(newText, volume, rate, value);
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
        <button
          type="button"
          onClick={() => handlePlay()}
          className={styles.playBtn}
        >
          <PlayIcon />
        </button>
      )}
      <Select
        onChange={handleVoiceChange}
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
