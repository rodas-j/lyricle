import { useState, useRef } from 'react'
import { VALID_GUESSES, LyricsField } from '../../constants/validGuesses'
import { solution } from '../../lib/songs'

import { ActionBar } from './ActionBar'

import { XIcon } from '@heroicons/react/outline'

export const SearchSong = ({ handleSubmit, handleSkip, guesses }) => {
  const [matchInput, setMatchInput] = useState<LyricsField[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const filterValidGuesses = (e): void => {
    if (e.target.value) {
      setMatchInput(
        VALID_GUESSES.filter(({ song }) =>
          song.toLowerCase().includes(e.target.value.toLowerCase())
        ).slice(0, 5)
      )
    } else {
      setMatchInput([])
    }
  }

  const changeInput = (e): void => {
    if (inputRef.current !== null) {
      inputRef.current.value = e.target.textContent
      setMatchInput([])
      inputRef.current.focus()
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative bg-gray-200 dark:bg-gray-700">
          <input
            ref={inputRef}
            className="lyrics-input relative p-4 w-full text-xl text-gray-800 dark:text-gray-200 bg-transparent group focus:outline-indigo-400"
            name="search"
            type="search"
            spellCheck="false"
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="off"
            placeholder="Know it? Search artist or the song."
            onChange={filterValidGuesses}
          />
          <SongOptions
            matchInput={matchInput}
            guesses={guesses}
            changeInput={changeInput}
          />
          <XIcon
            className="w-5 h-5 absolute top-[50%] translate-y-[-50%] right-4 stroke-gray-400 cursor-pointer"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.value = ''
              }
            }}
          />
        </div>
        <ActionBar handleSkip={handleSkip} inputRef={inputRef} />
      </form>
    </>
  )
}

function SongOptions({ matchInput, guesses, changeInput }) {
  return (
    <ul className="absolute bottom-full left-0 flex flex-col mb-3 w-full formide-y divide-gray-500 cursor-pointer">
      {matchInput.map(({ song }, index) => {
        let classes =
          'flex items-center p-4 bg-gray-200 mb-0.5 last:mb-0 text-gray-800 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'

        classes +=
          guesses.includes(song) && song !== solution.song
            ? ' pointer-events-none bg-rose-200 text-rose-800 dark:bg-rose-300 dark:text-rose-800'
            : ''

        return (
          <li key={index} className={classes} onClick={changeInput}>
            {guesses.includes(song) && song !== solution.song ? (
              <XIcon className="h-4 w-4 dark:stroke-rose-800 mr-3" />
            ) : (
              ''
            )}
            {song}
          </li>
        )
      })}
    </ul>
  )
}
