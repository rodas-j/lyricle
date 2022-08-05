import { v4 as uuidv4 } from 'uuid'
import { decadesConfig } from './config'

const gameStateKey = decadesConfig.gameState
const highContrastKey = 'highContrast'
const profileKey = 'profile'

type StoredGameState = {
  guesses: string[]
  song: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = decadesConfig.gameStats

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1')
  } else {
    localStorage.removeItem(highContrastKey)
  }
}

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey)
  return highContrast === '1'
}

export const setUUID = () => {
  localStorage.setItem(profileKey, uuidv4())
}

export const getUUID = () => {
  const id = localStorage.getItem(profileKey)
  return id ? id : null
}

export const getToday = () => {
  const date = localStorage.getItem('date')
  return date ? date : null
}

export const setToday = (day: number | string) => {
  localStorage.setItem('date', String(day))
}
