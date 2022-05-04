import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const HowToPlayModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to Play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-100">
        Guess the song in 6 tries. After each guess, the color of the
        corresponding section of the progress bar will change to show if your
        guess was correct or not.
      </p>
    </BaseModal>
  )
}
