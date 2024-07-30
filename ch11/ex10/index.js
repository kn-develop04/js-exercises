export function getDaysInMonth(year, month) {
  const date = new Date(year, month - 1, 1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() - 1);
  return date.getDate();
}
export function getWeekdayCount(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  let count = 0;

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}

export function getLocalizedDayOfWeek(dateStr, locale) {
  const date = new Date(dateStr);
  const options = { weekday: "long", timeZone: "UTC" };
  return date.toLocaleDateString(locale, options);
}

export function getLastMonthStart() {
  const date = new Date();
  date.setDate(0);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);

  // 日本標準時に変換
  const jstOffset = 9 * 60 * 60 * 1000;
  const lastMonthStartJST = new Date(date.getTime() + jstOffset);

  return lastMonthStartJST;
}
