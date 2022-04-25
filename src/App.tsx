import { useState, useEffect } from 'react'

import { LyricsLine } from './components/lyrics/LyricsLine'
import { SearchSong } from './components/input/SearchSong'
import { ProgressBar } from './components/progressbar/ProgressBar'

import { RefreshIcon } from '@heroicons/react/outline'

import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import {
  WIN_MESSAGES,
  // GAME_COPIED_MESSAGE,
  // NOT_ENOUGH_LETTERS_MESSAGE,
  // WORD_NOT_FOUND_MESSAGE,
  CORRECT_SONG_MESSAGE,
  // HARD_MODE_ALERT_MESSAGE,
} from './constants/strings'
import {
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  // WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import { isWinningSong, solution } from './lib/songs'

import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
  clearGameStateFromLocalStorage,
} from './lib/localStorage'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isReducedMotionMode, setIsReducedMotionMode] = useState(
    localStorage.getItem('reducedMotion')
      ? localStorage.getItem('reducedMotion') === 'reduce'
      : prefersReducedMotion
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )

  const [stats, setStats] = useState(() => loadStats())

  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.song !== solution.song) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution.song)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(CORRECT_SONG_MESSAGE(solution.song), {
        persist: true,
      })
    }
    return loaded.guesses
  })

  const [sliceLyrics, setSliceLyrics] = useState(1)

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

    if (isReducedMotionMode) {
      document.documentElement.classList.add('reduced-motion')
    } else {
      document.documentElement.classList.remove('reduced-motion')
    }
  }, [isDarkMode, isHighContrastMode, isReducedMotionMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const handleReducedMotionMode = (isReducedMotion: boolean) => {
    setIsReducedMotionMode(isReducedMotion)
    localStorage.setItem(
      'reducedMotion',
      isReducedMotion ? 'reduce' : 'no-preference'
    )
  }

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

  const revealNextLine = () => {
    setSliceLyrics(sliceLyrics + 1)
  }

  const revealAllLines = () => {
    setSliceLyrics(solution.lyrics.length)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (isGameWon || isGameLost) {
      return
    }

    setGuesses([...guesses, e.target.search.value])

    if (guesses.length === MAX_CHALLENGES - 1) {
      setIsGameLost(true)

      showErrorAlert(CORRECT_SONG_MESSAGE(solution.song), {
        persist: true,
      })

      return
    }

    if (isWinningSong(e.target.search.value)) {
      setStats(addStatsForCompletedGame(stats, guesses.length))
      revealAllLines()
      setIsGameWon(true)
    } else {
      revealNextLine()
      e.target.search.value = ''
    }
  }

  const onSkip = () => {
    if (isGameWon || isGameLost) {
      return
    }

    setGuesses([...guesses, 'skip'])
    revealNextLine()

    if (guesses.length === MAX_CHALLENGES - 1) {
      setStats(addStatsForCompletedGame(stats, guesses.length + 1))
      setIsGameLost(true)

      showErrorAlert(CORRECT_SONG_MESSAGE(solution.song), {
        persist: true,
      })
    }
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, song: solution.song })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, REVEAL_TIME_MS)
    }
  }, [isGameWon, isGameLost, showSuccessAlert])

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
      />
      <RefreshIcon
        className="mx-auto w-10 h-10 cursor-pointer dark:stroke-white"
        onClick={() => {
          clearGameStateFromLocalStorage()
          window.location.reload()
        }}
      />
      <div className="pt-2 px-1 pb-8 w-[90vw] max-w-[800px] mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          <LyricsLine sliceLyrics={sliceLyrics} />
        </div>
        <ProgressBar guesses={guesses} />
        <SearchSong
          guesses={guesses}
          handleSubmit={onSubmit}
          handleSkip={onSkip}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
          isDarkMode={isDarkMode}
          handleDarkMode={handleDarkMode}
          isHighContrastMode={isHighContrastMode}
          handleHighContrastMode={handleHighContrastMode}
          isReducedMotionMode={isReducedMotionMode}
          handleReducedMotionMode={handleReducedMotionMode}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          isDarkMode={isDarkMode}
          isHighContrastMode={isHighContrastMode}
          numberOfGuessesMade={guesses.length}
        />

        <AlertContainer />
      </div>
    </div>
  )
}

export default App
