import React, { useEffect, useRef, useState } from "react";
// import styles from "./TextReader.module.scss";

const TextReader = ({ textToRead = "Hello world" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [volume, setVolume] = useState(0.1);
  const [rate, setRate] = useState(1);
  const [charIndex, setCharIndex] = useState(0);
  const synth = useRef(window.speechSynthesis);
  const utterance = useRef(null);

  useEffect(() => {
    const synthRef = synth.current; // Capture the current value

    const updateVoices = () => {
      const voices = synthRef.getVoices(); // Use the captured value
      setSelectedVoice(voices[0]);
    };

    synthRef.addEventListener("voiceschanged", updateVoices);

    return () => {
      // Cleanup function
      synthRef.removeEventListener("voiceschanged", updateVoices);
      synthRef.cancel(); // Cancel any ongoing speech synthesis when component unmounts
    };
  }, []);

  useEffect(() => {
    const synthRef = synth.current;

    const handleBeforeUnload = () => {
      synthRef.cancel(); // Cancel any ongoing speech synthesis before unloading the page
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const createUtterance = () => {
    const utt = new SpeechSynthesisUtterance(textToRead);
    if (selectedVoice) {
      utt.voice = selectedVoice;
    }
    utt.volume = volume;
    utt.rate = rate;
    utt.onend = () => {
      setIsPlaying(false);
    };
    utt.onboundary = (event) => {
      setCharIndex(event.charIndex);
    };
    return utt;
  };

  const toggleSpeech = () => {
    // const { speaking, paused, pending } = synth.current;
    // console.log("Synthesis Status:", { speaking, paused, pending });

    // if (speaking || paused) {
    //   isPlaying ? synth.current.pause() : synth.current.resume();
    // } else {
    //   const utterance = new SpeechSynthesisUtterance(textToRead);
    //   if (selectedVoice) {
    //     utterance.voice = selectedVoice;
    //   }
    //   utterance.volume = volume;
    //   utterance.rate = rate;
    //   synth.current.speak(utterance);

    //   utterance.onerror = (event) => {
    //     console.log(
    //       "An error has occurred with the speech synthesis:",
    //       event.error
    //     );
    //   };

    //   console.log("Speech synthesis started:", textToRead);
    // }

    // console.log("Synthesis Status After Toggle:", {
    //   speaking: synth.current.speaking,
    //   paused: synth.current.paused,
    //   pending: synth.current.pending,
    // });

    // setIsPlaying(!isPlaying);

    if (!isPlaying) {
      utterance.current = createUtterance();
      utterance.current.text = textToRead.slice(charIndex);
      synth.current.speak(utterance.current);
      setIsPlaying(true);
    } else {
      synth.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVoiceChange = (event) => {
    const voiceName = event.target.value;
    const selectedVoice = synth.current
      .getVoices()
      .find((voice) => voice.name === voiceName);
    setSelectedVoice(selectedVoice);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  return (
    <div>
      <button onClick={toggleSpeech}>{isPlaying ? "Pause" : "Play"}</button>
      <select
        onChange={handleVoiceChange}
        value={selectedVoice ? selectedVoice.name : ""}
      >
        {synth.current.getVoices().map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <label>Volume: </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />
      <label>Rate: </label>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={rate}
        onChange={handleRateChange}
      />
    </div>
  );
};

export default TextReader;
