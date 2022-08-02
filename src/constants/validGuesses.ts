import ARTISTS_AND_SONGS from './all_validGuesses.json'

export type LyricsField = {
  id: number
  title: string
  artist: string
  song?: string | undefined
  lyrics: Array<string>
  soundcloudLink?: string
  artworkLink?: string
}

export const mapArtistToSongs: string[] = ARTISTS_AND_SONGS.map(
  ({ artist, songs }) => {
    for (let song of songs) {
      return `${artist} ─ ${song}`
    }

    return ''
  }
)
