import React, { useEffect, useRef, useState } from "react";
// import styles from "./TextReader.module.scss";

const TextReader = ({ textToRead = "Hello world" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);
  const synth = useRef(window.speechSynthesis);

  useEffect(() => {
    const updateVoices = () => {
      const voices = synth.current.getVoices();
      setSelectedVoice(voices[0]); // Set the first available voice by default
    };

    // Event listener for when voices are loaded
    synth.current.addEventListener("voiceschanged", updateVoices);

    // Cleanup on component unmount
    return () => {
      // eslint-disable-next-line
      synth.current.removeEventListener("voiceschanged", updateVoices);
    };
    // eslint-disable-next-line
  }, []);

  const toggleSpeech = () => {
    if (isPlaying) {
      synth.current.cancel();
    } else {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.volume = volume;
      utterance.rate = rate;
      synth.current.speak(utterance);
    }
    setIsPlaying(!isPlaying);
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
