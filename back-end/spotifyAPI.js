const SpotifyWebApi = require("spotify-web-api-node");
const SQLGenerator = require("./sqlgenerator");

var spotifyApi = new SpotifyWebApi({
  clientId: "e5ce7e36d8e44da29d724209325bdf20",
  clientSecret: "c33c1a0a417f43dbaa511834beb908c9",
  redirectUri: "http://www.spotify.com",
});

spotifyApi.setAccessToken(
  "BQAqS9Xo_Cx4JDSvDHgi7giw9QxYA0YDGxpTiEGUwtogx2e0NkUzE7paIFi-TzRyJzjVzZf8X6MXpS81zUUhm8PGx4WVxmD2BsJE4gWv7moP5FlE00E"
);

spotifyApi.getPlaylistTracks("37i9dQZF1DXdfOcg1fm0VG").then(
  function (data) {
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
    }
    // console.log("The playlist contains these tracks", data.body);
  },
  function (err) {
    console.log("Something went wrong!", err);
  }
);
