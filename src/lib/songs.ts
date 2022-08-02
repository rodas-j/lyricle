import SONG_CHOICES_ALL from '../constants/lyricle.json'
import SONG_CHOICES_80S from '../constants/80s.json'

import { mapArtistToSongs } from '../constants/validGuesses'

export const isWinningSong = (song: string) => {
  return solution.song === song
}

export const isAValidGuess = (query: string) => {
  return mapArtistToSongs.find((song) => song === query)
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
