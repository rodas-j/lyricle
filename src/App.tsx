import { useState, useEffect } from 'react'

import { LyricsLine } from './components/lyrics/LyricsLine'
import { SearchSong } from './components/input/SearchSong'
import { ProgressBar } from './components/progressbar/ProgressBar'

import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { HowToPlayModal } from './components/modals/HowToPlayModal'
import {
  WIN_MESSAGES,
  CORRECT_SONG_MESSAGE,
  GAME_COPIED_MESSAGE,
} from './constants/strings'
import {
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  WELCOME_INFO_MODAL_MS,
  // WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import { isWinningSong, isAValidGuess, solution } from './lib/songs'

import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
  getUUID,
  setUUID,
  setToday,
  getToday,
} from './lib/localStorage'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'

function App() {
  if (!getUUID()) {
    setUUID()
  }

  const handleRefresh = (e) => {
    e.preventDefault()
    console.log('Touched.')
    const today = new Date()
    const todayDate = today.getDate()
    if (getToday() !== String(todayDate)) {
      setToday(String(todayDate))
      window.location.reload()
    }
  }
  document.body.addEventListener('click', handleRefresh)

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
        persist: false,
      })
    }

    return loaded.guesses
  })

  const [sliceLyrics, setSliceLyrics] = useState(
    guesses.length ? guesses.length + 1 : 1
  )
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isHowToPlayModalOpen, setIsHowToPlayModalOpen] = useState(false)

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

    if (!isAValidGuess(e.target.search.value)) {
      return
    }

    setGuesses([...guesses, e.target.search.value])

    if (isWinningSong(e.target.search.value)) {
      setStats(addStatsForCompletedGame(stats, guesses.length))
      setIsGameWon(true)
      return
    } else {
      revealNextLine()
      e.target.search.value = ''
    }
    if (guesses.length === MAX_CHALLENGES - 1) {
      setIsGameLost(true)

      showErrorAlert(CORRECT_SONG_MESSAGE(solution.song), {
        persist: false,
      })

      return
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
        persist: false,
      })
    }
  }

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

  useEffect(() => {
    if (!loadGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsHowToPlayModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  }, [])

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

    if (isGameWon || isGameLost) {
      revealAllLines()
    }
  }, [isGameWon, isGameLost, showSuccessAlert])

  return (
    <div className="absolute inset-0 flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsHowToPlayModalOpen={setIsHowToPlayModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
      />
      <div className="pt-2 px-2 pb-2 md:pb-8 w-full max-w-[800px] mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          <LyricsLine sliceLyrics={sliceLyrics} />
        </div>
        <ProgressBar guesses={guesses} />
        <SearchSong
          isGameWon={isGameWon}
          isGameLost={isGameLost}
          guesses={guesses}
          handleSubmit={onSubmit}
          handleSkip={onSkip}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <HowToPlayModal
          isOpen={isHowToPlayModalOpen}
          handleClose={() => setIsHowToPlayModalOpen(false)}
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
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
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
