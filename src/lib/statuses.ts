import { currentDish } from './words'
import {
  getIngredientInfo,
  isSubstitute,
  isSameCategory,
} from '../constants/dishes'

export type IngredientStatus = 'absent' | 'present' | 'correct'

export interface IngredientFeedback {
  status: IngredientStatus
  message?: string
}

export const getIngredientStatuses = (
  guesses: string[]
): { [key: string]: IngredientStatus } => {
  const ingredientObj: { [key: string]: IngredientStatus } = {}

  guesses.forEach((ingredient) => {
    const upperIngredient = ingredient.toUpperCase()

    if (currentDish.coreIngredients.includes(upperIngredient)) {
      ingredientObj[upperIngredient] = 'correct'
    } else {
      // Check if it's a substitute or same category as any core ingredient
      let hasRelationship = false

      for (const coreIngredient of currentDish.coreIngredients) {
        if (
          isSubstitute(upperIngredient, coreIngredient) ||
          isSameCategory(upperIngredient, coreIngredient)
        ) {
          hasRelationship = true
          break
        }
      }

      if (hasRelationship && ingredientObj[upperIngredient] !== 'correct') {
        ingredientObj[upperIngredient] = 'present'
      } else if (!ingredientObj[upperIngredient]) {
        ingredientObj[upperIngredient] = 'absent'
      }
    }
  })

  return ingredientObj
}

export const getIngredientFeedback = (
  ingredient: string
): IngredientFeedback => {
  const upperIngredient = ingredient.toUpperCase()

  // Check if it's a core ingredient
  if (currentDish.coreIngredients.includes(upperIngredient)) {
    return {
      status: 'correct',
      message: 'Correct ingredient!',
    }
  }

  // Check for substitutes and same category
  for (const coreIngredient of currentDish.coreIngredients) {
    if (isSubstitute(upperIngredient, coreIngredient)) {
      return {
        status: 'present',
        message: 'Common substitute',
      }
    }

    if (isSameCategory(upperIngredient, coreIngredient)) {
      const coreInfo = getIngredientInfo(coreIngredient)
      return {
        status: 'present',
        message: `Right category, wrong item (${coreInfo?.category})`,
      }
    }
  }

  return {
    status: 'absent',
    message: 'Not a core ingredient',
  }
}

// Check if the game is won (all core ingredients guessed)
export const isGameWon = (guesses: string[]): boolean => {
  const correctGuesses = guesses.filter((guess) =>
    currentDish.coreIngredients.includes(guess.toUpperCase())
  )
  return correctGuesses.length === currentDish.coreIngredients.length
}

// Get remaining ingredients to be guessed
export const getRemainingIngredients = (guesses: string[]): string[] => {
  const correctGuesses = guesses
    .map((guess) => guess.toUpperCase())
    .filter((guess) => currentDish.coreIngredients.includes(guess))

  return currentDish.coreIngredients.filter(
    (ingredient) => !correctGuesses.includes(ingredient)
  )
}
