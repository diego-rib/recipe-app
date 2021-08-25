export default function getCurrentDate(separator = '/') {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${date}${separator}${month}${separator}${year}`;
}
