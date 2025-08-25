import { useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import { DishDisplay } from './components/dish/DishDisplay'
import { IngredientInput } from './components/input/IngredientInput'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import {
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  INGREDIENT_NOT_FOUND_MESSAGE,
  CORRECT_DISH_MESSAGE,
  HARD_MODE_ALERT_MESSAGE,
} from './constants/strings'
import {
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import { findFirstUnusedReveal } from './lib/words'
import { isGameWon } from './lib/statuses'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
} from './lib/localStorage'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()

  // Get current dish from Convex
  const dishOfDay = useQuery(api.gameData.getDishOfDay)
  const currentDish = dishOfDay?.dish
  const allIngredients = useQuery(api.gameData.getAllIngredients) || []
  const MAX_INGREDIENTS = currentDish?.coreIngredients.length || 5

  // Helper functions
  const isIngredientValid = (ingredient: string) => {
    return allIngredients.includes(ingredient.toUpperCase())
  }

  const isWinningIngredient = (ingredient: string) => {
    return (
      currentDish?.coreIngredients.includes(ingredient.toUpperCase()) || false
    )
  }

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWonState, setIsGameWonState] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
        ? true
        : false,
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode(),
  )
  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState<string[]>([])

  // Initialize guesses when currentDish is loaded
  useEffect(() => {
    if (!currentDish) return

    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== currentDish.name) {
      setGuesses([])
      return
    }

    const gameWasWon = isGameWon(loaded.guesses, currentDish)
    if (gameWasWon) {
      setIsGameWonState(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon && currentDish) {
      setIsGameLost(true)
      showErrorAlert(
        CORRECT_DISH_MESSAGE(currentDish.name, currentDish.coreIngredients),
        {
          persist: true,
        },
      )
    }
    setGuesses(loaded.guesses)
  }, [currentDish, MAX_CHALLENGES])

  const [stats, setStats] = useState(() => loadStats())

  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false,
  )

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHard)
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
    } else {
      showErrorAlert(HARD_MODE_ALERT_MESSAGE)
    }
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  useEffect(() => {
    if (currentDish) {
      saveGameStateToLocalStorage({ guesses, solution: currentDish.name })
    }
  }, [guesses, currentDish])

  useEffect(() => {
    if (isGameWonState) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * MAX_INGREDIENTS

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
    }

    if (isGameLost) {
      const GAME_LOST_INFO_DELAY = (MAX_INGREDIENTS + 1) * REVEAL_TIME_MS
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, GAME_LOST_INFO_DELAY)
    }
  }, [isGameWonState, isGameLost, showSuccessAlert])

  const onSubmitGuess = () => {
    if (isGameWonState || isGameLost) {
      return
    }

    if (!currentGuess.trim()) {
      return showErrorAlert('Please enter an ingredient')
    }

    if (!isIngredientValid(currentGuess)) {
      return showErrorAlert(INGREDIENT_NOT_FOUND_MESSAGE)
    }

    // Check if already guessed
    if (guesses.includes(currentGuess.toUpperCase())) {
      return showErrorAlert('Already guessed this ingredient')
    }

    setIsRevealing(true)
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * 2)

    const newGuesses = [...guesses, currentGuess.toUpperCase()]
    setGuesses(newGuesses)
    setCurrentGuess('')

    // Check if game is won
    if (currentDish && isGameWon(newGuesses, currentDish)) {
      setStats(addStatsForCompletedGame(stats, newGuesses.length))
      setIsGameWonState(true)
      return
    }

    // Check if game is lost
    if (newGuesses.length === MAX_CHALLENGES) {
      setStats(addStatsForCompletedGame(stats, newGuesses.length))
      setIsGameLost(true)
      if (currentDish) {
        showErrorAlert(
          CORRECT_DISH_MESSAGE(currentDish.name, currentDish.coreIngredients),
          {
            persist: true,
            delayMs: REVEAL_TIME_MS * 2 + 1,
          },
        )
      }
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
      />
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          {currentDish && (
            <DishDisplay 
              guesses={guesses} 
              isRevealing={isRevealing} 
              currentDish={currentDish}
            />
          )}
        </div>
        <div className="pb-4">
          <IngredientInput
            value={currentGuess}
            onChange={setCurrentGuess}
            onSubmit={onSubmitGuess}
            disabled={isGameWonState || isGameLost}
            placeholder="Guess an ingredient..."
          />
        </div>
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        {currentDish && dishOfDay && (
          <StatsModal
            isOpen={isStatsModalOpen}
            handleClose={() => setIsStatsModalOpen(false)}
            guesses={guesses}
            gameStats={stats}
            isGameLost={isGameLost}
            isGameWon={isGameWonState}
            handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
            isHardMode={isHardMode}
            isDarkMode={isDarkMode}
            isHighContrastMode={isHighContrastMode}
            numberOfGuessesMade={guesses.length}
            currentDish={currentDish}
            dishIndex={dishOfDay.dishIndex}
            tomorrow={dishOfDay.tomorrow}
          />
        )}
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
          isDarkMode={isDarkMode}
          handleDarkMode={handleDarkMode}
        />
        <AlertContainer />
      </div>
    </div>
  )
}

export default App
