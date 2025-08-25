import { DISHES, ALL_INGREDIENTS, getIngredientInfo } from '../constants/dishes'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'

export const isIngredientValid = (ingredient: string) => {
  return ALL_INGREDIENTS.includes(ingredient.toUpperCase())
}

export const isWinningIngredient = (ingredient: string) => {
  return currentDish.coreIngredients.includes(ingredient.toUpperCase())
}

// For Foodle, we don't need hard mode restrictions like Wordle
// But we keep this function for compatibility, always returning false
export const findFirstUnusedReveal = (
  ingredient: string,
  guesses: string[]
) => {
  // Foodle doesn't use hard mode constraints
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  const localeString = import.meta.env.VITE_LOCALE_STRING || import.meta.env.REACT_APP_LOCALE_STRING
  return localeString
    ? text.toLocaleLowerCase(localeString)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  const localeString = import.meta.env.VITE_LOCALE_STRING || import.meta.env.REACT_APP_LOCALE_STRING
  return localeString
    ? text.toLocaleUpperCase(localeString)
    : text.toUpperCase()
}

export const getDishOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date(2022, 0).valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    dish: DISHES[index % DISHES.length],
    dishIndex: index,
    tomorrow: nextday,
  }
}

export const { dish: currentDish, dishIndex, tomorrow } = getDishOfDay()
