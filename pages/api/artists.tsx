import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { artist, ind } = req.query;
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "json");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + `/artist_catalogs/${artist}/${artist}.json`,
    "utf8"
  );
  const data = JSON.parse(fileContents);

  //Return the content of the data file in json format
  res.status(200).json(data[parseInt(ind as string)]);
}
