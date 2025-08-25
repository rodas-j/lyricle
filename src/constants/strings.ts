export const GAME_TITLE = import.meta.env.VITE_GAME_NAME || import.meta.env.REACT_APP_GAME_NAME || 'Guessipe'

export const WIN_MESSAGES = [
  'Delicious!',
  'Perfectly seasoned!',
  "Chef's kiss!",
  'Bon appétit!',
]
export const GAME_COPIED_MESSAGE = 'Recipe copied to clipboard'
export const INGREDIENT_NOT_FOUND_MESSAGE = 'Ingredient not found'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can only be enabled at the start!'
export const HARD_MODE_DESCRIPTION =
  'Any revealed hints must be used in subsequent guesses'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const CORRECT_DISH_MESSAGE = (dishName: string, ingredients: string[]) =>
  `The dish was ${dishName}: ${ingredients.join(', ')}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Delete'
export const STATISTICS_TITLE = 'Statistics'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
export const NEW_DISH_TEXT = 'New dish in'
export const SHARE_TEXT = 'Share'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
