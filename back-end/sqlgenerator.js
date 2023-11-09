export default function SQLGenerator(data, tableName, operation) {
  switch (tableName) {
    case "Songs":
      switch (operation) {
        case "Create":
          return `INSERT INTO SONGS (songName, ${
            data[0]["Spotify Plays"] !== "" && "spotifyPlayCount"
          } ${data[1] !== 0 && " idGame"}) VALUES ${data[0]["Song Name"]}, ${
            data[0]["Spotify Plays"] !== "" && data[0]["Spotify Plays"]
          } ${data[1] !== 0 && " idGame"}`;
        case "Update":
          return `UPDATE SONGS SET songName = ${data[0]["Song Name"]}, spotifyPlayCount = ${data[0]["Spotify Plays"]}, idGame = ${data[0]["Game ID"]}  WHERE idSong = ${data[0]["Song ID"]}`;
      }
    case "Games":
      switch (operation) {
        case "Create":
        case "Update":
      }
    case "Composers":
      switch (operation) {
        case "Create":
        case "Update":
      }
    case "Developers":
      switch (operation) {
        case "Create":
        case "Update":
      }
    case "Composers_Songs":
      switch (operation) {
        case "Create":
        case "Update":
      }
    case "Composers_Developers":
      switch (operation) {
        case "Create":
        case "Update":
      }
    case "Games_Composers":
      switch (operation) {
        case "Create":
        case "Update":
      }
  }
}
