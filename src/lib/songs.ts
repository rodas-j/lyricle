import VALID_GUESSES from '../constants/all_validGuesses.json'
import SONG_CHOICES_ALL from '../constants/lyricle.json'

export const isWinningSong = (song: string) => {
  return solution.song === song
}

export const isAValidGuess = (query: string) => {
  return VALID_GUESSES.find(
    ({ artist, songs }) => artist === query || songs.includes(query)
  )
}

export const getSongOfTheDay = () => {
  const epochMs = new Date('April 24, 2022').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextDay = (index + 1) * msInDay + epochMs

  const songOfTheDay = SONG_CHOICES_ALL[index % SONG_CHOICES_ALL.length]
  const solution = {
    song: `${songOfTheDay.artist} ─ ${songOfTheDay.title}`,
    ...songOfTheDay,
  }

  return {
    solution: solution,
    solutionIndex: index,
    tomorrow: nextDay,
  }
}

export const { solution, solutionIndex, tomorrow } = getSongOfTheDay()
