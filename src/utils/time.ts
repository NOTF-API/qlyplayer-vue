export function format(second: number) {
  if (!second || isNaN(second)) {
    return "00:00.00";
  }
  const s = parseInt("" + (second % 60));
  const m = parseInt("" + second / 60);
  const ms = parseFloat("" + (second - parseInt("" + second)))
    .toFixed(2)
    .slice(2);
  let timeString = "";
  if (m < 10) {
    timeString += "0";
  }
  timeString += m;
  timeString += ":";
  if (s < 10) {
    timeString += "0";
  }
  timeString += s;
  timeString += ".";

  timeString += ms;
  return timeString;
}
