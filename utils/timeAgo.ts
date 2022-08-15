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
