import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./CurrentTime.module.scss";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format("HH:mm"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const date = moment().format("dddd, D MMMM, YYYY");

  return (
    <div className={styles.wrapper}>
      <p className={styles.currentTime}>{currentTime}</p>
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default CurrentTime;
