module.exports = function SQLGenerator(data, tableName, operation) {
  switch (tableName) {
    case "Songs":
      switch (operation) {
        case "CREATE":
          return `INSERT INTO SONGS (songName${
            data[0]["Spotify Plays"] !== "" ? ", spotifyPlayCount" : ""
          }${data[1] !== 0 ? ", idGame" : ""}) VALUES (${data[0]["Song Name"]}${
            data[0]["Spotify Plays"] !== ""
              ? `, ${data[0]["Spotify Plays"]})`
              : ""
          }${data[1] !== 0 ? `, ${data[1]}` : ""}`;
        case "Update":
          return `UPDATE SONGS SET songName = ${data[0]["Song Name"]}, spotifyPlayCount = ${data[0]["Spotify Plays"]}, idGame = ${data[0]["Game ID"]}  WHERE idSong = ${data[0]["Song ID"]}`;
      }
    case "Games":
      switch (operation) {
        case "CREATE":
          return `INSERT INTO GAMES (gameName${
            data[1] !== 0 ? ", idDeveloper" : ""
          }) VALUES (${data[0]["Game Name"]}${
            data[1] !== 0 ? `, ${data[1]}` : ""
          })`;
        case "Update":
      }
    case "Composers":
      switch (operation) {
        case "CREATE":
          return `INSERT INTO COMPOSERS (composerFName${
            data[0]["Composer Last Name"] !== "" ? ", composerLNAME" : ""
          }${
            data[0]["Monthly Spotify Listeners"] !== ""
              ? ", spotifyMonthlyListenerCount"
              : ""
          }) VALUES (${data[0]["Composer First Name"]}${
            data[0]["Composer Last Name"] !== ""
              ? `, ${data[0]["Composer Last Name"]}`
              : ""
          }${
            data[0]["Monthly Spotify Listeners"] !== ""
              ? `, ${data[0]["Monthly Spotify Listeners"]}`
              : ""
          })`;
        case "Update":
      }
    case "Developers":
      switch (operation) {
        case "CREATE":
        case "Update":
      }
    case "Composers_Songs":
      switch (operation) {
        case "CREATE":
        case "Update":
      }
    case "Composers_Developers":
      switch (operation) {
        case "CREATE":
        case "Update":
      }
    case "Games_Composers":
      switch (operation) {
        case "CREATE":
        case "Update":
      }
  }
};
