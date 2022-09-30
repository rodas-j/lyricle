import axios from "axios";

async function getLyrics(artist: string, index: string) {
  var config = {
    method: "get",
    url: `http://localhost:5001/decades/${artist}/${index}`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      const res = JSON.stringify(response.data);
      return res;
    })
    .catch(function (error) {
      return error;
    });
}

export default getLyrics;
