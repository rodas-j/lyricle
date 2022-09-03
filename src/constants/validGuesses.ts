import TAYLORSWIFT_ARTISTS_AND_SONGS from './taylorswift_validGuesses.json'
import PRINCE_ARTISTS_AND_SONGS from './prince_validGuesses.json'
import BEATLES_ARTISTS_AND_SONGS from './beatles_validGuesses.json'

import DEFAULT_ARTISTS_AND_SONGS from './all_validGuesses.json'
import { decadesConfig } from '../lib/config'

export type LyricsField = {
  id: number
  title: string
  artist: string
  song?: string | undefined
  lyrics: Array<string>
  soundcloudLink?: string
  artworkLink?: string
}
let ARTISTS_AND_SONGS = TAYLORSWIFT_ARTISTS_AND_SONGS

switch (decadesConfig.key) {
  case 'taylorswift':
    ARTISTS_AND_SONGS = TAYLORSWIFT_ARTISTS_AND_SONGS
    break

  case 'prince':
    ARTISTS_AND_SONGS = PRINCE_ARTISTS_AND_SONGS
    break

  case 'beatles':
    ARTISTS_AND_SONGS = BEATLES_ARTISTS_AND_SONGS
    break

  default:
    ARTISTS_AND_SONGS = DEFAULT_ARTISTS_AND_SONGS
}

export const mapArtistToSongs: string[] = []

ARTISTS_AND_SONGS.forEach(({ artist, songs }) => {
  for (let song of songs) {
    mapArtistToSongs.push(`${artist} ─ ${song}`)
  }
})
