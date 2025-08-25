import { getIngredientFeedback } from './statuses'
import { GAME_TITLE } from '../constants/strings'
import { MAX_CHALLENGES } from '../constants/settings'
import { UAParser } from 'ua-parser-js'

interface Dish {
  name: string
  coreIngredients: string[]
  description?: string
}

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  handleShareToClipboard: () => void,
  currentDish: Dish,
  dishIndex: number
) => {
  const correctCount = guesses.filter((guess) =>
    currentDish.coreIngredients.includes(guess.toUpperCase())
  ).length

  const dishEmoji = getDishEmoji(currentDish.name)

  const textToShare =
    `${GAME_TITLE} #${dishIndex}: ${currentDish.name} ${dishEmoji} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}\n\n` +
    generateEmojiGrid(guesses, getEmojiTiles(isDarkMode, isHighContrastMode), currentDish) +
    `\n\nWhat are the ingredients? guessipe.app`

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

export const generateEmojiGrid = (guesses: string[], tiles: string[], currentDish: Dish) => {
  return guesses
    .map((guess) => {
      const feedback = getIngredientFeedback(guess, currentDish)

      switch (feedback.status) {
        case 'correct':
          return tiles[0]
        case 'present':
          return tiles[1]
        default:
          return tiles[2]
      }
    })
    .join('')
}

const getDishEmoji = (dishName: string): string => {
  const emojiMap: { [key: string]: string } = {
    'PESTO GENOVESE': '🌿',
    'MARGHERITA PIZZA': '🍕',
    'CAESAR SALAD': '🥗',
    GUACAMOLE: '🥑',
    HUMMUS: '🧆',
    CARBONARA: '🍝',
    'CAPRESE SALAD': '🍅',
    'GREEK SALAD': '🫒',
    'CLASSIC CHILI': '🌶️',
    'FRENCH OMELETTE': '🥚',
  }

  return emojiMap[dishName] || '🍽️'
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
  tiles.push(isHighContrastMode ? '🟦' : '🟨')
  tiles.push(isDarkMode ? '⬛' : '⬜')
  return tiles
}
