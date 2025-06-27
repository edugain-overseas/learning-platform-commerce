import React, { useEffect, useState } from "react";
import { privateRoutesHandler } from "../../../http/privateRoutesHandler";
import { useTimer } from "../../../hooks/useTimer";
import { convertMillisecondsToHoursMinutesAndSeconds } from "../../../utils/formatTime";
import { useDispatch } from "react-redux";
import { getTestAttemptsThunk } from "../../../redux/lesson/operation";
import styles from "./ExpiredAttemptsMessage.module.scss";

const ExpiredAttemptsMessage = ({
  testId,
  wrapperClassname = styles.wrapper,
}) => {
  const [time, setTime] = useState(null);
  const dispatch = useDispatch();

  const onComplete = async () => {
    try {
      await dispatch(getTestAttemptsThunk({ test_id: testId })).unwrap();
    } catch (error) {
      console.log("UNWRAP THREW ERROR:", error);
    }
  };

  const { timeLeft, start } = useTimer({
    initialTime: time,
    onComplete,
    storageKey: null,
  });

  useEffect(() => {
    if (time) {
      start();
    }
    // eslint-disable-next-line
  }, [time]);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await privateRoutesHandler(
          "get",
          `/student-test/status?test_id=${testId}`
        );
        const secondsLeft = response.seconds_left;

        if (secondsLeft) {
          setTime(secondsLeft * 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTime();
  }, [testId]);

  if (!timeLeft) {
    return null;
  }

  const displayTime = convertMillisecondsToHoursMinutesAndSeconds(timeLeft);

  return (
    <p className={wrapperClassname}>
      Your attempts have expired. You will receive new attempts in{" "}
      <span>
        {`${displayTime.hours}`.padStart(2, "0")}:
        {`${displayTime.minutes}`.padStart(2, "0")}:
        {`${displayTime.seconds}`.padStart(2, "0")}
      </span>
      .
    </p>
  );
};

export default ExpiredAttemptsMessage;
