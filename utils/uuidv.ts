export const uuidv = () => {
  const randomId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  return randomId
}
