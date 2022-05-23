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
        <div className="flex  mt-3">
          <a
            href="mailto:lyricleadmineth@gmail.com"
            className="md:text-l text-gray-100 underline underline-offset-1 ring-transparent ring-0"
          >
            Email
          </a>
        </div>
      </div>
    </>
  )
}
