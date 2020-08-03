import moment from "moment";

export const formatTo = (date, format) => {
  if (!format || !date) {
    return "";
  }

  return moment(date).format(format);
};

export const formatToPTBR = (date) => {
  return formatTo(date, "DD/MM/YYYY");
};

export const formatToPTBRTime = (date) => {
  return formatTo(date, "DD/MM/YYYY HH:mm");
};
