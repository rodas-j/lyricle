import { solution } from '../../lib/songs'

export const ProgressBar = ({ guesses }) => {
  return (
    <div className="flex w-full mb-3 space-x-1">
      {[...new Array(6)].map((line, index) => {
        return (
          <div
            key={index}
            data-check={
              guesses[index]
                ? guesses[index] === solution.song
                  ? 'correct'
                  : 'wrong'
                : ''
            }
            className="flex-grow bg-gray-800 h-2 relative cursor-pointer group"
          >
            <ToolTip guess={guesses[index]} />
          </div>
        )
      })}
    </div>
  )
}

export const ToolTip = ({ guess }) => {
  if (!guess) return <></>

  return (
    <div className="tooltip absolute left-0 right-0 mx-auto w-max mb-3 bottom-full p-2 rounded-md bg-gray-500 invisible group-hover:visible">
      {guess}
    </div>
  )
}
