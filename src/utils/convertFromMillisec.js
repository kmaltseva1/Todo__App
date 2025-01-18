const convertFromMillisec = (milliseconds) => {
  const fullSecond = Math.floor(milliseconds / 1000)
  let minutes = Math.floor(fullSecond / 60)
  let second = fullSecond - minutes * 60
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (second < 10) {
    second = `0${second}`
  }
  return `${minutes}:${second}`
}
export default convertFromMillisec
