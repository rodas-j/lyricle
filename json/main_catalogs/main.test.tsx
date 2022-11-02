import SONG_CHOICES from "./main.json";
import VALID_GUESSES from "./all_validGuesses.json";

const mapArtistToSongs: string[] = [];

VALID_GUESSES.forEach(({ artist, songs }) => {
  for (let song of songs) {
    mapArtistToSongs.push(`${artist} ─ ${song}`);
  }
});

const isAValidGuess = (query: string) => {
  return mapArtistToSongs.find((song) => song === query) ? true : false;
};

describe("main catalog", () => {
  it("has a valid guess for every song choice", () => {
    expect(
      SONG_CHOICES.every(({ artist, title }) =>
        isAValidGuess(`${artist} ─ ${title}`)
      )
    ).toBe(true);
  });
});
