import { solution } from '../../lib/songs'

export const ProgressBar = ({ guesses }) => {
  return (
    <div className="flex w-full mb-3 space-x-1">
      {solution.lyrics.map((line, index) => {
        return (
          <div
            className="flex-grow bg-gray-800 h-2"
            data-check={
              guesses[index]
                ? guesses[index] === solution
                  ? 'correct'
                  : guesses[index] === 'skipped'
                  ? 'skip'
                  : 'wrong'
                : ''
            }
          ></div>
        )
      })}
    </div>
  )
}
