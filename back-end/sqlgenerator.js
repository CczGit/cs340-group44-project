module.exports = function SQLGenerator(data, tableName, operation) {
  switch (tableName) {
    case "Songs":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Songs WHERE idSong = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO Songs (songName${
            data[0]["Spotify Plays"] !== "" ? ", spotifyPlayCount" : ""
          }${data[1] !== 0 ? ", idGame" : ""}) VALUES ("${
            data[0]["Song Name"]
          }"${
            data[0]["Spotify Plays"] !== ""
              ? `, ${data[0]["Spotify Plays"]}`
              : ""
          }${data[1] !== 0 ? `, ${data[1]}` : ""});`;
        case "UPDATE":
          return `UPDATE Songs SET songName = "${
            data[0]["Song Name"]
          }", spotifyPlayCount = ${data[0]["Spotify Plays"]}, idGame = ${
            data[1] !== 0 ? data[1] : "NULL"
          }  WHERE idSong = ${data[2]};`;
      }
    case "Games":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Games WHERE idGame = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO Games (gameName${
            data[1] !== 0 ? ", idDeveloper" : ""
          }) VALUES ("${data[0]["Game Name"]}"${
            data[1] !== 0 ? `, ${data[1]}` : ""
          });`;
        case "UPDATE":
          return `UPDATE Games SET gameName = "${
            data[0]["Game Name"]
          }", idDeveloper = ${
            data[1] !== 0 ? data[1] : "NULL"
          } WHERE idGame = ${data[2]};`;
      }
    case "Composers":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Composers WHERE idComposer = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO Composers (composerFName${
            data[0]["Composer Last Name"] !== "" ? ", composerLNAME" : ""
          }${
            data[0]["Monthly Spotify Listeners"] !== ""
              ? ", spotifyMonthlyListenerCount"
              : ""
          }) VALUES ("${data[0]["Composer First Name"]}"${
            data[0]["Composer Last Name"] !== ""
              ? `, "${data[0]["Composer Last Name"]}"`
              : ""
          }${
            data[0]["Monthly Spotify Listeners"] !== ""
              ? `, ${data[0]["Monthly Spotify Listeners"]}`
              : ""
          });`;
        case "UPDATE":
          return `UPDATE Composers SET composerFName = "${data[0]["Composer First Name"]}", composerLName = "${data[0]["Composer Last Name"]}", spotifyMonthlyListenerCount = ${data[0]["Monthly Spotify Listeners"]} WHERE idComposer = ${data[2]};`;
      }
    case "Developers":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Developers WHERE idDeveloper = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO Developers (devName) VALUES ("${data[0]["Developer Name"]}");`;
        case "UPDATE":
          return `UPDATE Developers SET devName = "${data[0]["Developer Name"]}" WHERE idDeveloper = ${data[2]};`;
      }
    case "Composers_Songs":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Composers_Songs WHERE idComposerSong = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO Composers_Songs (idComposer, idSong) VALUES (${data[1]}, ${data[0]["Song ID"]});`;
        case "UPDATE":
          return `UPDATE Composers_Songs SET idComposer = "${data[1]}", idSong = "${data[0]["Song ID"]}" WHERE idComposerSong = ${data[2]};`;
      }
    case "Composers_Developers":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Composers_Developers WHERE idComposerDeveloper = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO Composers_Developers (idComposer, idDeveloper) VALUES (${data[1]}, ${data[0]["Developer ID"]});`;
        case "UPDATE":
          return `UPDATE Composers_Developers SET idComposer = "${data[1]}", idDeveloper = "${data[0]["Developer ID"]}" WHERE idComposerDeveloper = ${data[2]};`;
      }
    case "Games_Composers":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Games_Composers WHERE idComposerGame = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO Games_Composers (idComposer, idGame) VALUES (${data[1]}, ${data[0]["Game ID"]});`;
        case "UPDATE":
          return `UPDATE Games_Composers SET idComposer = "${data[1]}", idGame = "${data[0]["Game ID"]}" WHERE idComposerGame = ${data[2]};`;
      }
  }
};
