import { GAME_TITLE } from '../constants/strings'
import { solution, solutionIndex } from './songs'
import { UAParser } from 'ua-parser-js'
import { MAX_CHALLENGES } from '../constants/settings'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()

export const shareStatus = (
  guesses: string[],
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  handleShareToClipboard: () => void
) => {
  // To add ⬛/⬜ at the end if song solved in under MAX_CHALLENGES guesses
  while (guesses.length < MAX_CHALLENGES) {
    guesses.push('skip')
  }

  const textToShare =
    `#${GAME_TITLE} #${solutionIndex}\n\n` +
    generateEmojiGrid(guesses, getEmojiTiles(isDarkMode, isHighContrastMode)) +
    `\n\nhttps://lyricle.app`

  const shareData = { text: textToShare }

  let shareSuccess = false

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData)
      shareSuccess = true
    }
  } catch (error) {
    shareSuccess = false
  }

  if (!shareSuccess) {
    navigator.clipboard.writeText(textToShare)
    handleShareToClipboard()
  }
}

const generateEmojiGrid = (guesses: string[], tiles: string[]) => {
  return guesses
    .map((guess) => {
      if (guess === solution.song) {
        return tiles[0]
      } else if (guess.split('─')[0] === solution.song.split('─')[0]) {
        return tiles[3]
      } else if (guess !== 'skip') {
        return tiles[1]
      } else {
        return tiles[2]
      }
    })
    .join('')
}

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  )
}

const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
  let tiles: string[] = []
  tiles.push(isHighContrastMode ? '🟧' : '🟩')
  tiles.push(isHighContrastMode ? '🟦' : '🟥')
  tiles.push(isDarkMode ? '⬛' : '⬜')
  tiles.push('🟨')
  return tiles
}
