//format date to string in format "Day, MM"
export function formatDate(date: Date) {
  const day = date.getDay()
  const month = date.getMonth() + 1
  return `${day}/${month}`
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
