import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsHowToPlayModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void

  shouldHideStatsModalButton: boolean
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsHowToPlayModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  shouldHideStatsModalButton,
}: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-content relative px-2">
        <div className="flex items-center">
          {shouldHideStatsModalButton ? (
            <></>
          ) : (
            <a
              href="https://artists.lyricle.app"
              className=" bg-slate-200 p-1.5 rounded-md font-bold mr-3 cursor-pointer dark:stroke-white"
            >
              {' '}
              Artists
            </a>
          )}
          <InformationCircleIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
        <p className="text-xl md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 font-bold dark:text-white">
          {GAME_TITLE}
        </p>
        <div className="flex">
          <QuestionMarkCircleIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsHowToPlayModalOpen(true)}
          />
          {shouldHideStatsModalButton ? (
            <></>
          ) : (
            <ChartBarIcon
              className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
              onClick={() => setIsStatsModalOpen(true)}
            />
          )}
          <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr />
    </div>
  )
}
