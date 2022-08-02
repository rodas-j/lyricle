export const GAME_TITLE = window.location.href.endsWith('/80s')
  ? 'Lyricle 80s'
  : process.env.REACT_APP_GAME_NAME!

export const WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']
export const GAME_COPIED_MESSAGE = 'Game copied to clipboard'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can only be enabled at the start!'
export const HARD_MODE_DESCRIPTION =
  'Any revealed hints must be used in subsequent guesses'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const REDUCED_MOTION_MODE_DESCRIPTION = 'For minimal animations'
export const REGION_NOT_SUPPORTED = 'This song is not supported in your region'
export const CORRECT_SONG_MESSAGE = (solution: string) => {
  return `The song was ${solution.split('─')[1]} by ${solution.split('─')[0]}`
}
export const STATISTICS_TITLE = 'Statistics'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
export const NEW_SONG_TEXT = 'Next Lyricle in'
export const SHARE_TEXT = 'Share'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
export const LISTEN_TO_TITLE = (solution: string) => {
  return `Listen to ${solution} on SoundCloud`
}
export const SOUNDCLOUD_WIDGET_BACKGROUND = (artworkUrl: string) => {
  return 'w-20 bg-cover bg-center bg-[url(' + artworkUrl + ')]'
}
