import path from "path";
import { promises as fs } from "fs";

export default async function getValidGuesses(artist: string, ind: number) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "json");
  //Read the json directory
  const validGuessesFileContents = await fs.readFile(
    jsonDirectory + `/artist_catalogs/${artist}/${artist}_validGuesses.json`,
    "utf8"
  );

  const validGuesses = JSON.parse(validGuessesFileContents);
  //Return the content of the data file in json format

  return { validGuesses };
}

export async function listArtists() {
  //list all the artists in the artist_catalogs directory
  const jsonDirectory = path.join(process.cwd(), "json");
  const fileContents = await fs.readdir(
    jsonDirectory + `/artist_catalogs/`,
    "utf8"
  );
  return fileContents;
}
