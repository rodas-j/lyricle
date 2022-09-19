import { v4 as uuidv4 } from "uuid";

const highContrastKey = "highContrast";
const profileKey = "profile";

type StoredGameState = {
  guesses: string[];
  song: string;
};

export const saveGameStateToLocalStorage = (
  gameStateKey: string,
  gameState: StoredGameState
) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = (gameStateKey: string) => {
  if (typeof localStorage !== "undefined") {
    const state = localStorage.getItem(gameStateKey);
    return state ? (JSON.parse(state) as StoredGameState) : null;
  }
};

export type GameStats = {
  winDistribution: number[];
  gamesFailed: number;
  currentStreak: number;
  bestStreak: number;
  totalGames: number;
  successRate: number;
};

export const saveStatsToLocalStorage = (
  gameStatKey: string,
  gameStats: GameStats
) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats));
};

export const loadStatsFromLocalStorage = (gameStatKey: string) => {
  if (typeof localStorage !== "undefined") {
    const stats = localStorage.getItem(gameStatKey);
    return stats ? (JSON.parse(stats) as GameStats) : null;
  }
};

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, "1");
  } else {
    localStorage.removeItem(highContrastKey);
  }
};

export const getStoredIsHighContrastMode = () => {
  if (typeof localStorage !== "undefined") {
    const highContrast = localStorage.getItem(highContrastKey);
    return highContrast === "1";
  }
  return false;
};

export const setUUID = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(profileKey, uuidv4());
  }
};

export const getUUID = () => {
  if (typeof localStorage !== "undefined") {
    const id = localStorage.getItem(profileKey);
    return id ? id : null;
  }
};

export const getToday = () => {
  if (typeof localStorage !== "undefined") {
    const date = localStorage.getItem("date");
    return date ? date : null;
  }
};

export const setToday = (day: number | string) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("date", String(day));
  }
};
