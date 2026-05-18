export function buildCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startIndex = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const weeks: Array<Array<number | null>> = [];
  let currentDay = 1;
  while (currentDay <= totalDays) {
    const week: Array<number | null> = Array(7).fill(null);
    for (let i = 0; i < 7; i++) {
      if ((weeks.length === 0 && i < startIndex) || currentDay > totalDays) {
        continue;
      }
      week[i] = currentDay;
      currentDay += 1;
    }
    weeks.push(week);
  }
  return weeks;
}