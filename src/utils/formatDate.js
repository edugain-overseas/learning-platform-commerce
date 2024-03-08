import dayjs from "dayjs";

export const getFormattedStrFromDate = (date, format = "YYYY.MM.DD") =>
  dayjs(date).format(format);
