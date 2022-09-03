import SONG_CHOICES_ALL from '../constants/lyricle.json'
import SONG_CHOICES_TAYLORSWIFT from '../constants/taylorswift.json'
import SONG_CHOICES_PRINCE from '../constants/prince.json'
import SONG_CHOICES_BEATLES from '../constants/beatles.json'

import { decadesConfig } from './config'
import { mapArtistToSongs } from '../constants/validGuesses'
import { getToday, setToday } from './localStorage'

let SONG_CHOICES = SONG_CHOICES_ALL

switch (decadesConfig.key) {
  case 'taylorswift':
    SONG_CHOICES = SONG_CHOICES_TAYLORSWIFT
    break

  case 'prince':
    SONG_CHOICES = SONG_CHOICES_PRINCE
    break

  case 'beatles':
    SONG_CHOICES = SONG_CHOICES_BEATLES
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
  const epochMs = new Date('August 31, 2022').valueOf()
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
