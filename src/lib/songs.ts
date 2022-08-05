import SONG_CHOICES_ALL from '../constants/lyricle.json'
import SONG_CHOICES_80S from '../constants/80s.json'
import SONG_CHOICES_70s from '../constants/70s.json'
import SONG_CHOICES_90S from '../constants/90s.json'
import { decadesConfig } from './config'
import { mapArtistToSongs } from '../constants/validGuesses'
import { getToday, setToday } from './localStorage'

let SONG_CHOICES = SONG_CHOICES_ALL

switch (decadesConfig.key) {
  case '70s':
    SONG_CHOICES = SONG_CHOICES_70s
    break
  case '80s':
    SONG_CHOICES = SONG_CHOICES_80S
    break

  case '90s':
    SONG_CHOICES = SONG_CHOICES_90S
    break

  default:
    SONG_CHOICES = SONG_CHOICES_ALL
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

  const songOfTheDay = SONG_CHOICES[index % SONG_CHOICES.length]
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
