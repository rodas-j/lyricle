import { VALID_GUESSES } from '../constants/validGuesses'
import { getToday, setToday } from './localStorage'

export const isWinningSong = (song: string) => {
  return solution.song === song
}

export const isAValidGuess = (query: string) => {
  return VALID_GUESSES.find(({ song }) => song === query)
}

export const getSongOfTheDay = () => {
  const epochMs = new Date('April 24, 2022').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextDay = (index + 1) * msInDay + epochMs

  return {
    solution: VALID_GUESSES[index % VALID_GUESSES.length],
    solutionIndex: index,
    tomorrow: nextDay,
  }
}

if (!getToday()) {
  const today = new Date()
  const day = today.getDate()
  setToday(day)
}
const handleRefresh = (e) => {
  e.preventDefault()
  const today = new Date()
  const todayDate = today.getDate()
  if (getToday() !== String(todayDate)) {
    setToday(String(todayDate))
    window.location.reload()
  }
}
document.body.addEventListener('click', handleRefresh)

export const { solution, solutionIndex, tomorrow } = getSongOfTheDay()
