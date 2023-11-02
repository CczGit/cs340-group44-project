const fs = require("fs");

function generateDevelopersSQL(developers) {
  // Convert the developers array to a string of SQL insert statements for the Games table
  return developers
    .map((developer) => {
      return `INSERT INTO Developers (devName) VALUES ('${developer.name}');`;
    })
    .join("\n");
}

function generateGamesSQL(games) {
  // Convert the games array to a string of SQL insert statements for the Songs table
  return games
    .map((game) => {
      return `INSERT INTO Games (gameName, idDeveloper) VALUES ('${game.name}', ${game.developerID});`;
    })
    .join("\n");
}

function generateSongsSQL(songs) {
  // Convert the songs array to a string of SQL insert statements for the Songs table
  return songs
    .map((song) => {
      return `INSERT INTO Songs (songName, songSpotifyPopularity, idGame) VALUES ('${song.name}', ${song.popularity}, ${song.gameID}});`;
    })
    .join("\n");
}

function generateComposersSQL(composers) {
  // Convert the composers array to a string of SQL insert statements for the Songs table
  return composers
    .map((composer) => {
      return `INSERT INTO Composers (composerFName, composerLName, composerSpotifyPopularity) VALUES ('${composer.fname}', ${composer.lname}, ${composer.popularity}});`;
    })
    .join("\n");
}

exports = {
  developers: generateDevelopersSQL,
  songs: generateSongsSQL,
  games: generateGamesSQL,
  composers: generateComposersSQL,
};
