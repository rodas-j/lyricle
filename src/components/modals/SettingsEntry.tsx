import { MailIcon } from '@heroicons/react/solid'

type Props = {
  settingName: string
  description?: string
}

export const SettingsEntry = ({ settingName, description }: Props) => {
  return (
    <>
      <div className="flex justify-between gap-4 py-3">
        <div className="text-gray-500 dark:text-gray-300 mt-2 text-left">
          <p className="leading-none">{settingName}</p>
          {description && (
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
        <div className="flex mt-3">
          <a
            href="mailto:lyricleadmineth@gmail.com"
            className="rounded-full p-1 bg-gray-300 dark:bg-gray-700 text-white focus-visible:outline-none"
          >
            <MailIcon className="h-8 w-8" />
          </a>
        </div>
      </div>
    </>
  )
}
