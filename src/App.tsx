import { useState, useEffect } from 'react'
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
  MAX_INGREDIENTS,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
  WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import {
  isIngredientValid,
  isWinningIngredient,
  currentDish,
  findFirstUnusedReveal,
} from './lib/words'
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
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== currentDish.name) {
      return []
    }
    const gameWasWon = isGameWon(loaded.guesses)
    if (gameWasWon) {
      setIsGameWonState(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(
        CORRECT_DISH_MESSAGE(currentDish.name, currentDish.coreIngredients),
        {
          persist: true,
        },
      )
    }
    return loaded.guesses
  })

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
    saveGameStateToLocalStorage({ guesses, solution: currentDish.name })
  }, [guesses])

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
    if (isGameWon(newGuesses)) {
      setStats(addStatsForCompletedGame(stats, newGuesses.length))
      setIsGameWonState(true)
      return
    }

    // Check if game is lost
    if (newGuesses.length === MAX_CHALLENGES) {
      setStats(addStatsForCompletedGame(stats, newGuesses.length))
      setIsGameLost(true)
      showErrorAlert(
        CORRECT_DISH_MESSAGE(currentDish.name, currentDish.coreIngredients),
        {
          persist: true,
          delayMs: REVEAL_TIME_MS * 2 + 1,
        },
      )
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
          <DishDisplay guesses={guesses} isRevealing={isRevealing} />
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
        />
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
