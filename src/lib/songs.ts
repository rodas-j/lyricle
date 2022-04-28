import { VALID_GUESSES } from '../constants/validGuesses'

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

export const randomizeSongOfTheDay = () => {
  return {
    solution: VALID_GUESSES[Math.trunc(Math.random() * VALID_GUESSES.length)],
  }
}

export const { solutionIndex, tomorrow } = getSongOfTheDay()
export const { solution } = randomizeSongOfTheDay()
