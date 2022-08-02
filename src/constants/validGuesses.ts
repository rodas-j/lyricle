export type LyricsField = {
  id: number
  title: string
  artist: string
  song?: string | undefined
  lyrics: Array<string>
  soundcloudLink?: string
  artworkLink?: string
}
