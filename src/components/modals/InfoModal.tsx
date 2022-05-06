import { BaseModal } from './BaseModal'

import { ReactComponent as Twitter } from '../../assets/twitter.svg'
import { ReactComponent as Instagram } from '../../assets/instagram.svg'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <div className="w-full h-0 pb-[56%] relative mt-3 mb-6 pointer-events-none">
        <iframe
          className="giphy-embed absolute"
          title="another-one-gif"
          src="https://giphy.com/embed/qgri3D9sTwCUGMcT8L"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <p className="text-sm dark:text-gray-200 mb-6">
        We're sure you're all familiar with the "-le" type games by now. We were{' '}
        <span className="decoration-double line-through">heavily</span> inspired
        by both{' '}
        <a
          className="underline decoration-dashed decoration-green-400 dark:decoration-green-200 decoration-2 hover:bg-green-200 hover:text-gray-900 px-1"
          href="https://heardle.app"
          target="_blank"
          rel="noreferrer"
        >
          Heardle
        </a>{' '}
        and{' '}
        <a
          className="underline decoration-dashed decoration-green-400 dark:decoration-green-200 decoration-2 hover:bg-green-200 hover:text-gray-900 px-1"
          href="https://www.nytimes.com/games/wordle/index.html"
          target="_blank"
          rel="noreferrer"
        >
          Wordle
        </a>{' '}
        to create Lyricle.
      </p>

      <p className="text-sm dark:text-gray-200 mb-6">Hope you enjoy!</p>

      <div className="flex justify-center">
        <div className="icon flex mr-3">
          <a href="https://twitter.com/lyricle_app">
            <Twitter className="w-6 h-6 mx-1 grayscale hover:grayscale-0" />
          </a>
          <a href="https://www.instagram.com/lyricle_app/">
            <Instagram className="w-6 h-6 mx-1 grayscale hover:grayscale-0" />
          </a>
        </div>
        <p className="dark:text-gray-200">@lyricle_app</p>
      </div>
    </BaseModal>
  )
}
