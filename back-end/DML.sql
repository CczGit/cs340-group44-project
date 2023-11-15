-- Query for add a new composer functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO Composers (composerFName, composerLName)
VALUES (:composerFNameInput, :composerLNameInput);

-- Query for add a new developer functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO Developers (devName)
VALUES (:devNameInput);

-- Query for add a new song functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO Songs (songName, idGame)
VALUES (:songNameInput, :idGameInput);

-- Query for add a new game functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

INSERT INTO Games (gameName, idDeveloper)
VALUES (:gameNameInput, :idDeveloperInput);

-- Query for updating a composer functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

UPDATE Composers
SET composerFName = :composerFNameInput, composerLName = :composerLNameInput
WHERE idComposer = :idComposerInput;

-- Query for updating a developer functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

UPDATE Developers
SET devName = :devNameInput
WHERE idDeveloper = :idDeveloperInput;

-- Query for updating a song functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

UPDATE Songs
SET songName = :songNameInput
WHERE idSong = :idSongInput;

-- Query for updating a game functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

UPDATE Games
SET gameName = :gameNameInput
WHERE idGame = :idGameInput;

-- Query for deleting a composer functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

DELETE FROM Composers WHERE composerFName = :composerFNameInput AND composerLName = :composerLNameInput;

-- Query for deleting a developer functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

DELETE FROM Developers WHERE idDev = :idDevInput;

-- Query for deleting a song functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

DELETE FROM Songs WHERE idSong = :idSongInput;

-- Query for deleting a game functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

DELETE FROM Games WHERE idGame = :idGameInput;

-- Query for selecting a composer functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

SELECT :composerFNameInput, :composerLNameInput FROM Composers;

-- Query for selecting a developer functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

SELECT :devNameInput; FROM Composers;

-- Query for selecting a song functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

SELECT :songNameInput; FROM Songs;

-- Query for selecting a game functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

SELECT :gameNameInput; FROM Games;

-- MySQL Workbench Forward Engineering

-- Queries that populate the tables we have on the UI

SELECT idDeveloper AS 'ID', devName as 'Developer Name' FROM Developers;

SELECT idComposer AS 'ID', composerFName AS 'Composer First Name', composerLName AS 'Composer Last Name', spotifyMonthlyListenerCount AS 'Monthly Spotify Listeners' FROM Composers;

SELECT Composers_Songs.idSong as 'Song ID', Songs.songName AS 'Song Name', Composers_Songs.idComposer as 'Composer ID', Composers.composerFName as 'Composer First Name', Composers.composerLName as 'Composer Last Name', Songs.spotifyPlayCount AS 'Song Spotify Plays' FROM Composers_Songs LEFT JOIN Composers ON Composers.idComposer = Composers_Songs.idComposer LEFT JOIN Songs on Composers_Songs.idSong = Songs.idSong ORDER BY Songs.spotifyPlayCount DESC;

SELECT Composers_Developers.idDeveloper AS 'Developer ID', Developers.devName as 'Developer Name' , Composers_Developers.idComposer AS 'Composer ID', Composers.composerFName as 'Composer First Name', Composers.composerLName as 'Composer Last Name', Composers.spotifyMonthlyListenerCount AS 'Monthly Spotify Listeners' FROM Composers_Developers LEFT JOIN Composers ON Composers_Developers.idComposer = Composers.idComposer LEFT JOIN Developers on Developers.idDeveloper = Composers_Developers.idDeveloper;

SELECT Games.idGame AS 'Game ID', Games.gameName AS 'Game Name', Games.idDeveloper AS 'Developer ID', Developers.devName AS 'Developer Name' FROM Games LEFT JOIN Developers on Developers.idDeveloper = Games.idDeveloper;

SELECT Games_Composers.idGame AS 'Game ID', Games.gameName AS 'Game Name', Games_Composers.idComposer AS 'Composer ID', Composers.composerFName as 'Composer First Name', Composers.composerLName as 'Composer Last Name', Composers.spotifyMonthlyListenerCount AS 'Monthly Spotify Listeners' FROM Games_Composers LEFT JOIN Games on Games.idGame = Games_Composers.idGame LEFT JOIN Composers on Composers.idComposer = Games_Composers.idComposer;

SELECT Songs.idSong AS 'Song ID', Songs.songName as 'Song Name', Songs.idGame as 'Game ID', Games.gameName AS 'Game Name', Songs.spotifyPlayCount AS 'Spotify Plays' FROM Songs LEFT JOIN Games on Games.idGame = Songs.idGame ORDER BY Songs.spotifyPlayCount DESC;
