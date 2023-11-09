module.exports = function SQLGenerator(data, tableName, operation) {
  currv;
  switch (tableName) {
    case "Songs":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Songs WHERE id = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO SONGS (songName${
            data[0]["Spotify Plays"] !== "" ? ", spotifyPlayCount" : ""
          }${data[1] !== 0 ? ", idGame" : ""}) VALUES ("${
            data[0]["Song Name"]
          }"${
            data[0]["Spotify Plays"] !== ""
              ? `, ${data[0]["Spotify Plays"]})`
              : ""
          }${data[1] !== 0 ? `, ${data[1]}` : ""};`;
        case "UPDATE":
          return `UPDATE SONGS SET songName = "${data[0]["Song Name"]}", spotifyPlayCount = ${data[0]["Spotify Plays"]}, idGame = ${data[1]}  WHERE idSong = ${data[2]};`;
      }
    case "Games":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Games WHERE id = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO GAMES (gameName${
            data[1] !== 0 ? ", idDeveloper" : ""
          }) VALUES (${data[0]["Game Name"]}${
            data[1] !== 0 ? `, ${data[1]}` : ""
          });`;
        case "UPDATE":
          return `UPDATE GAMES SET gameName = "${data[0]["Game Name"]}", idDeveloper = ${data[1]} WHERE idGame = ${data[2]};`;
      }
    case "Composers":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Composers WHERE id = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO COMPOSERS (composerFName${
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
          return `UPDATE Composers SET composerFName = "${data[0]["Composer First Name"]}", composerLName = "${data[0]["Composer Last Name"]}", spotifyMontlyListenerCount = ${data[0]["Monthly Spotify Listeners"]} WHERE idComposer = ${data[2]};`;
      }
    case "Developers":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Developers WHERE id = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO DEVELOPERS (devName) VALUES ("${data[0]["Developer Name"]}");`;
        case "UPDATE":
          return `UPDATE Developers SET devName = "${data[0]["Developer Name"]}" WHERE idDeveloper = ${data[2]};`;
      }
    case "Composers_Songs":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Composers_Songs WHERE idSong = ${data[0]} AND idComposer = ${data[1]};`;
        case "CREATE":
          return `INSERT INTO Composers_Songs (idComposer, idSong) VALUES (${data[0]["Composer ID"]} ${data[0]["Song ID"]});`;
        case "UPDATE":
          return;
      }
    case "Composers_Developers":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Composers_Developers WHERE idComposer = ${data[1]} AND idDeveloper = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO Composers_Developers (idComposer, idDeveloper) VALUES (${data[0]["Composer ID"]} ${data[0]["Developer ID"]});`;
        case "UPDATE":
          return;
      }
    case "Games_Composers":
      switch (operation) {
        case "DELETE":
          return `DELETE FROM Games_Composers WHERE idComposer = ${data[1]} AND idGame = ${data[0]};`;
        case "CREATE":
          return `INSERT INTO Games_Composers (idComposer, idGame) VALUES (${data[0]["Composer ID"]} ${data[0]["Game ID"]});`;
        case "UPDATE":
          return;
      }
  }
};
