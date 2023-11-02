import React from "react-router-dom";

export default function HomePage() {
  return <><h1>Home Page</h1>
    <p>Welcome to the Ultimate Video Game Soundtrack Database, a database-driven website that is used to record
      information about video game soundtracks, including composers, songs, games, and developers. We're here to
      enhance the music-listening experience for the passionate community of video game soundtrack enthusiasts.
      Our platform provides an integrated, connected, and efficient process to explore the world of video game music.
      Not only can you discover the complete works of your favorite composers and games, but you can also search by developer,
      making it easier than ever to find the gems you're looking for.</p>
    <table>
      <tr>
        <th>Table Name</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Developers</td>
        <td>An entity that contains data about video game developers.</td>
      </tr>
      <tr>
        <td>Composers</td>
        <td>An entity that contains data about video game soundtrack composers.</td>
      </tr>
      <tr>
        <td>Composers_Songs</td>
        <td>An intersection table that supports the M:N relationship between Composers and Songs.</td>
      </tr>
      <tr>
        <td>Composers_Developers</td>
        <td>An intersection table that supports the M:N relationship between Composers and Developrs</td>
      </tr>
      <tr>
        <td>Games</td>
        <td>An entity that contains data about video games.</td>
      </tr>
      <tr>
        <td>Games_Composers</td>
        <td>An intersection table that supports the M:N relationship between Games and Composers</td>
      </tr>
      <tr>
        <td>Songs</td>
        <td>An entity that contains data about video game soundtrack songs.</td>
      </tr>
    </table>
  </>;
}
