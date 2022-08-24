import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/songs'
import { BaseModal } from './BaseModal'
import { SongModal } from './SongModal'
import { solution } from '../../lib/songs'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_SONG_TEXT,
  SHARE_TEXT,
} from '../../constants/strings'

import { ReactComponent as RedditIcon } from '../../assets/reddit.svg'
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg'

type Props = {
  isHomePage: boolean
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
}

export const StatsModal = ({
  isHomePage,
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
}: Props) => {
  if (isHomePage) return <></>

  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <>
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <SongModal
          isOpen={isOpen && (isGameWon || isGameLost)}
          solution={solution}
          variant={isGameWon ? 'success' : 'error'}
        />
        <StatBar gameStats={gameStats} />
        <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
          {GUESS_DISTRIBUTION_TEXT}
        </h4>
        <Histogram
          gameStats={gameStats}
          numberOfGuessesMade={numberOfGuessesMade}
        />

        <JoinOurCommunities />

        {(isGameLost || isGameWon) && (
          <>
            <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
              <div>
                <h5>{NEW_SONG_TEXT}</h5>
                <Countdown
                  className="text-lg font-medium text-gray-900 dark:text-gray-100"
                  date={tomorrow}
                  daysInHours={true}
                />
              </div>
              <button
                type="button"
                className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                onClick={() => {
                  shareStatus(
                    guesses,
                    isDarkMode,
                    isHighContrastMode,
                    handleShareToClipboard
                  )
                }}
              >
                {SHARE_TEXT}
              </button>
            </div>
            <div className="mt-2">
              <a
                href="https://forms.gle/C8EoeJQ2vzArGVnb7"
                className="cursor-pointer"
              >
                <p className="text-black underline text-sm dark:text-white">
                  📨 Wanna Improve Lyricle?
                </p>
              </a>
            </div>
          </>
        )}
      </BaseModal>
    </>
  )
}

const JoinOurCommunities = () => {
  return (
    <div className="flex my-3 items-center bg-indigo-200 outline-dashed outline-2 outline-indigo-900 md:hover:outline-offset-2 dark:bg-indigo-600/20 dark:outline-indigo-400 p-2">
      <p className="dark:text-white text-sm md:text-base">
        Join the Lyricle community!
      </p>
      <div className="flex ml-auto">
        <a
          href="https://www.reddit.com/r/lyricle_official/"
          target="_blank"
          rel="noreferrer"
          className="focus-visible:outline-none"
        >
          <RedditIcon className="w-6 h-6 mx-1 fill-gray-700 hover:fill-gray-900 dark:fill-gray-100 dark:hover:fill-white" />
        </a>
        <a
          href="https://discord.gg/84WNMqAT"
          target="_blank"
          rel="noreferrer"
          className="focus-visible:outline-none"
        >
          <DiscordIcon className="w-6 h-6 mx-1 fill-gray-700 hover:fill-gray-900 dark:fill-gray-100 dark:hover:fill-white" />
        </a>
        <a
          href="https://www.facebook.com/groups/1730611307275095"
          target="_blank"
          rel="noreferrer"
          className="focus-visible:outline-none"
        >
          <FacebookIcon className="w-6 h-6 mx-1 fill-gray-700 hover:fill-gray-900 dark:fill-gray-100 dark:hover:fill-white" />
        </a>
      </div>
    </div>
  )
}
