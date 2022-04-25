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
        <div className="relative bg-gray-700">
          <input
            ref={inputRef}
            className="p-4 w-full text-xl text-gray-200 bg-transparent appearance-none focus:outline-none"
            name="search"
            type="search"
            spellCheck="false"
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="off"
            placeholder="Know it? Search artist or the song."
            onChange={filterValidGuesses}
          />
          <ul className="absolute bottom-full left-0 flex- flex-col mb-3 w-full formide-y divide-gray-500 cursor-pointer">
            {matchInput.map(({ song }, index) => {
              let classes =
                'flex items-center p-4 bg-gray-600 text-gray-200 hover:bg-gray-700'

              classes +=
                guesses.includes(song) && song !== solution.song
                  ? ' pointer-events-none bg-red-300 text-red-800'
                  : ''

              return (
                <li key={index} className={classes} onClick={changeInput}>
                  {guesses.includes(song) && song !== solution.song ? (
                    <XIcon className="h-5 w-5 dark:stroke-red-800 mr-3" />
                  ) : (
                    ''
                  )}
                  {song}
                </li>
              )
            })}
          </ul>
        </div>
        <ActionBar handleSkip={handleSkip} inputRef={inputRef} />
      </form>
    </>
  )
}
