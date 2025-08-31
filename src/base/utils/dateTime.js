export function getNowDateTimeStr() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short', // タイムゾーンを略語で表示（例: 'JST'）
  };
  return now.toLocaleString('ja-JP', options);
}

function formatDateTime(dateTimeString, callback) {
  const [datePart, timePart] = dateTimeString.split(" ");
  const [year, month, date] = datePart.split("/");
  const [hour, minute, second] = timePart.split(":");
  return callback({
    year: year, month: month, date: date, 
    hour: hour, minute: minute, second: second
  });
};

export function formatDate(dateTimeString) {
  return formatDateTime(
    dateTimeString, 
    ({year, month, date}) => `${year}年${month}月${date}日`
  );
}

export function formatTime(dateTimeString) {
  return formatDateTime(
    dateTimeString, 
    ({hour, minute}) => `${hour}:${minute}`
  );
}
