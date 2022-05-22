import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'
import { SettingsEntry } from './SettingsEntry'
import {
  // HARD_MODE_DESCRIPTION,
  HIGH_CONTRAST_MODE_DESCRIPTION,
  REDUCED_MOTION_MODE_DESCRIPTION,
} from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
  isReducedMotionMode: boolean
  handleReducedMotionMode: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  isReducedMotionMode,
  handleReducedMotionMode,
}: Props) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="flex flex-col mt-2 divide-y">
        <SettingsToggle
          settingName="Dark Mode"
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Reduced Motion"
          flag={isReducedMotionMode}
          handleFlag={handleReducedMotionMode}
          description={REDUCED_MOTION_MODE_DESCRIPTION}
        />
        <SettingsEntry
          settingName="Feedback"
          description="Send us a feedback through our email!"
        />
      </div>
    </BaseModal>
  )
}
