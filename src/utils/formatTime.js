export const convertMillisecondsToHoursAndMinutes = (milliseconds) => {
  const totalMinutes = milliseconds / (1000 * 60);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return { hours, minutes };
};

export const convertMillisecondsToMinutesAndSeconds = (milliseconds) => {
  const totalSeconds = milliseconds / 1000;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { minutes, seconds };
};

export const convertMillisecondsToHoursMinutesAndSeconds = (milliseconds) => {
  const totalSeconds = milliseconds / 1000;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  return { hours, minutes, seconds };
};

export const minutesToMilliseconds = (minutes) => minutes * 60 * 1000;
