export const calculateTimeAgo = (createdAt: number) => {
  const timeInMinutes = Math.round((Date.now() - createdAt) / (1000 * 60))
  if (timeInMinutes > 60) {
    const timeInHours = timeInMinutes / 60 // 1.1, 1.111, 1.1232, 2.1...
    const fractionalPart =
      parseFloat(timeInHours.toFixed(1)) - Math.floor(timeInHours)
    const minutes = fractionalPart * 60
    return `${Math.floor(timeInHours)}h ${Math.floor(minutes)}m`
  } else {
    return `${timeInMinutes}m`
  }
}

export function formatDateNow(createdAt: number) {
  const timeInMinutes = Math.round((Date.now() - createdAt) / (1000 * 60))
  if (timeInMinutes > 60) {
    const timeInHours = timeInMinutes / 60 // 1.1, 1.111, 1.1232, 2.1...
    if (timeInHours > 24) {
      const timeInDays = timeInHours / 24 // 1.1, 1.111, 1.1232, 2.1...
      if (timeInDays > 7) {
        const timeInWeeks = timeInDays / 7 // 1.1, 1.111, 1.1232, 2.1...
        if (timeInWeeks > 4) {
          const timeInMonths = timeInWeeks / 4 // 1.1, 1.111, 1.1232, 2.1...
          if (timeInMonths > 12) {
            const timeInYears = timeInMonths / 12 // 1.1, 1.111, 1.1232, 2.1...
            return `${Math.round(timeInYears)} years`
          }
          return `${Math.round(timeInMonths)} months`
        }
        return `${Math.round(timeInWeeks)} weeks`
      }
      return `${Math.round(timeInDays)} days`
    } else {
      const fractionalPart =
        parseFloat(timeInHours.toFixed(1)) - Math.floor(timeInHours)
      const minutes = fractionalPart * 60
      return `${Math.floor(timeInHours)}h ${Math.floor(minutes)}m`
    }
  } else {
    return `${timeInMinutes} minutes`
  }
}
