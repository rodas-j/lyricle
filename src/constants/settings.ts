import { currentDish } from '../lib/words'

export const MAX_INGREDIENTS = currentDish.coreIngredients.length
export const MAX_CHALLENGES = 6
export const ALERT_TIME_MS = 2000
export const REVEAL_TIME_MS = 350
export const GAME_LOST_INFO_DELAY = (MAX_INGREDIENTS + 1) * REVEAL_TIME_MS
export const WELCOME_INFO_MODAL_MS = 350
