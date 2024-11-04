export function getCurrentTimeHHMMSS(keepHourZero = true, today = new Date()) {
  let hours = today.getHours();
  if (keepHourZero && hours < 10) hours = '0' + hours;
  const minutes = `0${today.getMinutes()}`;
  const seconds = `0${today.getSeconds()}`;
  return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
}
