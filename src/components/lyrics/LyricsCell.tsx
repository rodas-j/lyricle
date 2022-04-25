import { solution } from '../../lib/songs'

export const LyricsCell = ({ sliceLyrics = 1 }) => {
  return (
    <>
      {solution.lyrics.slice(0, sliceLyrics).map((line) => (
        <div className="p-4 text-xl bg-gray-800 text-gray-100 text-center mb-2">
          {line}
        </div>
      ))}
    </>
  )
}
