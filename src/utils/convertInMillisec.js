const convertInMillisec = (min, sec) => {
  const convertMinutes = Number(min) * 60 * 1000
  const convertSeconds = Number(sec) * 1000
  return convertMinutes + convertSeconds
}
export default convertInMillisec
