-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Table structure for table 'Developers'
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Developers` ;

CREATE TABLE IF NOT EXISTS `Developers` (
  `idDeveloper` INT NOT NULL AUTO_INCREMENT,
  `devName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDeveloper`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Dumping data for table 'Developers'
-- -----------------------------------------------------
INSERT INTO Developers (devName) VALUES	('Naughty Dog'),('Bungie'),('Bluepoint Games'),('Mojang Studios'),('Bethesda'),('CD Projekt Red'),('Ubisoft'),('From Software');

-- -----------------------------------------------------
-- Table structure for table `Games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Games` ;

CREATE TABLE IF NOT EXISTS `Games` (
  `idGame` INT NOT NULL AUTO_INCREMENT,
  `gameName` VARCHAR(45) NOT NULL,
  `idDeveloper` INT NULL,
  PRIMARY KEY (`idGame`),
  INDEX `fk_Games_Developers1_idx` (`idDeveloper` ASC) VISIBLE,
  CONSTRAINT `fk_Games_Developers1`
    FOREIGN KEY (`idDeveloper`)
    REFERENCES `Developers` (`idDeveloper`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Dumping data for table 'Games'
-- -----------------------------------------------------

INSERT INTO Games (gameName, idDeveloper) VALUES ('The Last of Us', 1),('Halo', 2),('God of War Ragnarok', 3),('Minecraft', 4),('The Elder Scrolls', 5),('Cyberpunk 2077', 6),("Assassin's Creed", 7),('Starfield', 5),('Elden Ring', 8);

-- -----------------------------------------------------
-- Table structure for table `Composers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Composers` ;

CREATE TABLE IF NOT EXISTS `Composers` (
  `idComposer` INT NOT NULL AUTO_INCREMENT,
  `composerFName` VARCHAR(45) NOT NULL,
  `composerLName` VARCHAR(45) NULL,
  `spotifyMonthlyListenerCount` INT NULL,
  PRIMARY KEY (`idComposer`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Dumping data for table 'Composers'
-- -----------------------------------------------------

INSERT INTO Composers (composerFName, composerLName, spotifyMonthlyListenerCount) VALUES ('Gustavo', 'Santaolalla', 1987159),('Martin', "O'Donnell", 738979),('Bear', 'McCreary', 1991967),('C418', '', 2720303),('Jeremy', 'Soule', 1452607),('Jesper', 'Kyd', 1022846),('P.T', 'Adamczyk', 981976),('Brendan', 'Angelides', 353530),('Inon', 'Zur', 393920),('Tsukassa', 'Saitoh', 220954),('Eivor', '', 394132),('Michael', 'Salvatori', 805500),('Layth', 'Sidiq', 3836);

-- -----------------------------------------------------
-- Table structure for table `Songs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Songs` ;

CREATE TABLE IF NOT EXISTS `Songs` (
  `idSong` INT NOT NULL AUTO_INCREMENT,
  `songName` VARCHAR(45) NOT NULL,
  `spotifyPlayCount` INT NULL,
  `idGame` INT NULL,
  PRIMARY KEY (`idSong`),
  INDEX `fk_Songs_Games1_idx` (`idGame` ASC) VISIBLE,
  CONSTRAINT `fk_Songs_Games1`
    FOREIGN KEY (`idGame`)
    REFERENCES `Games` (`idGame`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Dumping data for table 'Songs'
-- -----------------------------------------------------

INSERT INTO Songs (songName, spotifyPlayCount, idGame) VALUES	('The Last Of Us', 63375577, 1),('Halo', 31919289, 2),('God of War Ragnarok', 10238495, 3),('Sweden', 141137600, 4),('Dragonborn', 44438146, 5),("Ezio's Family", 50640359, 7),('The Rebel Path', 19019520, 6),('Mirage Theme', 337248, 7),('Elden Ring', 5174659, 9),('Into the Starfield', 245204, 8),('Svartalfheim', 1659291, 3),('Key', 62687976, 4),('Door', 26521901, 4),('Subwoofer Lullaby', 86266764, 4),('Death', 15369877, 4),('Living Mice', 42552108, 4),('Moog City', 39448499, 4),('Haggstrom', 45172512, 4),('Minecraft', 93469946, 4),('Oxygene', 24581416, 4),('Equinoxe', 25257339, 4),('Mice On Venus', 61110792, 4),('Dry Hands', 46681455, 4),('Wet Hands', 73771979, 4),('Clark', 32056107, 4),('Chris', 21418656, 4),('Thirteen', 12385291, 4),('Excuse', 22136904, 4),('Cat', 29351787, 4),('Dog', 18216904, 4),('Danny', 29722289, 4),('Beginning', 24718409, 4),('Droopy Likes Ricochet', 13033652, 4),('Droopy Likes Your Face', 17109221, 4),('Awake', 24627301, 5),('From Past to Present', 32701366, 5),('Unbroken Road', 10634876, 5),('Ancient Stones', 23663104, 5),('The City Gates', 17244253, 5),('Silent Footsteps', 8981964, 5),('Dragonsreach', 11063304, 5),('Tooth and Claw', 6179985, 5),('Under an Ancient Sun', 12424433, 5),('Death or Sovngarde', 5673627, 5),('Masser', 10849479, 5),('Distant Horizons', 16004179, 5),('Dawn', 15228752, 5),('The Jerall Mountains', 10712216, 5),('Steel on Steel', 5688121, 5),('Secunda', 47870671, 5),('Imperial Throne', 9704029, 5),('Frostfall', 15293161, 5),('Night Without Stars', 4744610, 5),('Into Darkness', 5153451, 5),("Kyne's Peace", 17813721, 5),('Unbound', 7117169, 5),('Far Horizons', 21078419, 5),("A Winter's Tale", 13538189, 5),('The Bannered Mare', 17491423, 5),('The Streets of Whiterun', 27757573, 5),('One They Fear', 5554130, 5),('The White River', 10263971, 5),('Silence Unbroken', 5287206, 5),('Standing Stones', 7933714, 5),('Beneath the Ice', 6114765, 5),('Tundra', 14285808, 5),("Journey's End", 11134610, 5),('Before the Storm', 7468606, 5),('A Chance Meeting', 8399861, 5),('Out of the Cold', 9139357, 5),('Around the Fire', 11244614, 5),('Shadows and Echoes', 4476510, 5),('Caught off Guard', 3349174, 5),('Aurora', 11342094, 5),('Blood and Steel', 3656717, 5),('Towers and Shadows', 3795681, 5),('Seven Thousand Steps', 5929893, 5),('Solitude', 12935085, 5),('Watch the Skies', 4294135, 5),('The Gathering Storm', 8837425, 5),('Sky Above, Voice Within', 9129471, 5),('Death in the Darkness', 3702551, 5),('Shattered Shields', 3732124, 5),('Sovngarde', 8941768, 5),('Wind Guide You', 13926094, 5),('Skyrim Atmospheres', 16907409, 5),('Earth', 10924948, 7),('Venice Rooftops', 7522786, 7);

-- -----------------------------------------------------
-- Table structure for table `Composers_Developers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Composers_Developers` ;

CREATE TABLE IF NOT EXISTS `Composers_Developers` (
  `idComposer` INT NULL,
  `idDeveloper` INT NULL,
  INDEX `fk_Composers_Developers_Developers1_idx` (`idDeveloper` ASC) VISIBLE,
  INDEX `fk_Composers_Developers_Composers1_idx` (`idComposer` ASC) VISIBLE,
  CONSTRAINT `fk_Composers_Developers_Composers1`
    FOREIGN KEY (`idComposer`)
    REFERENCES `Composers` (`idComposer`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Composers_Developers_Developers1`
    FOREIGN KEY (`idDeveloper`)
    REFERENCES `Developers` (`idDeveloper`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Dumping data for table `Composers_Developers`
-- -----------------------------------------------------

INSERT INTO Composers_Developers (idComposer, idDeveloper) VALUES (1,1),(2,2),(12,2),(3,3),(3,10),(4,4),(5,5),(6,7),(7,6),(8,5),(9,5),(10,8),(11,2);

-- -----------------------------------------------------
-- Table structure for table `Games_Composers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Games_Composers` ;

CREATE TABLE IF NOT EXISTS `Games_Composers` (
  `idGame` INT NULL,
  `idComposer` INT NULL,
  INDEX `fk_Games_Composers_Composers1_idx` (`idComposer` ASC) VISIBLE,
  INDEX `fk_Games_Composers_Games1_idx` (`idGame` ASC) VISIBLE,
  CONSTRAINT `fk_Games_Composers_Games1`
    FOREIGN KEY (`idGame`)
    REFERENCES `Games` (`idGame`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Games_Composers_Composers1`
    FOREIGN KEY (`idComposer`)
    REFERENCES `Composers` (`idComposer`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Dumping data for table `Games_Composers`
-- -----------------------------------------------------

INSERT INTO Games_Composers (idComposer, idGame) VALUES (1,1),(2,2),(12,2),(3,3),(3,10),(4,4),(5,5),(6,7),(7,6),(8,7),(9,8),(10,9),(11,2);

-- -----------------------------------------------------
-- Table structure for table `Composers_Songs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Composers_Songs` ;

CREATE TABLE IF NOT EXISTS `Composers_Songs` (
  `idComposer` INT NULL,
  `idSong` INT NULL,
  INDEX `fk_Composers_Songs_Songs1_idx` (`idSong` ASC) VISIBLE,
  INDEX `fk_Composers_Songs_Composers1_idx` (`idComposer` ASC) VISIBLE,
  CONSTRAINT `fk_Composers_Songs_Composers1`
    FOREIGN KEY (`idComposer`)
    REFERENCES `Composers` (`idComposer`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Composers_Songs_Songs1`
    FOREIGN KEY (`idSong`)
    REFERENCES `Songs` (`idSong`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Data dump for table `Composers_Songs`
-- -----------------------------------------------------

INSERT INTO Composers_Songs (idSong, idComposer) VALUES (1, 1),(2, 2),(2, 12),(3, 3),(3, 10),(4, 4),(5, 5),(6, 6),(7, 7),(8, 8),(9, 10),(10, 9),(11, 3),(11, 10),(12, 4),(13, 4),(14, 4),(15, 4),(16, 4),(17, 4),(18, 4),(19, 4),(20, 4),(21, 4),(22, 4),(23, 4),(24, 4),(25, 4),(26, 4),(27, 4),(28, 4),(29, 4),(30, 4),(31, 4),(32, 4),(33, 4),(34, 4),(35, 5),(36, 5),(37, 5),(38, 5),(39, 5),(40, 5),(41, 5),(42, 5),(43, 5),(44, 5),(45, 5),(46, 5),(47, 5),(48, 5),(49, 5),(50, 5),(51, 5),(52, 5),(53, 5),(54, 5),(55, 5),(56, 5),(57, 5),(58, 5),(59, 5),(60, 5),(61, 5),(62, 5),(63, 5),(64, 5),(65, 5),(66, 5),(67, 5),(68, 5),(69, 5),(70, 5),(71, 5),(72, 5),(73, 5),(74, 5),(75, 5),(76, 5),(77, 5),(78, 5),(79, 5),(80, 5),(81, 5),(82, 5),(83, 5),(84, 5),(85, 5),(86, 5),(87, 6),(88, 6);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Query to select all songs and print out their name, 
-- game, developer, composer and spotify play count
-- ordered by spotify play count descending.
-- -----------------------------------------------------

-- SELECT Songs.songName, Songs.spotifyPlayCount, Games.gameName, Developers.devName, Composers.composerFName, Composers.composerLName
-- FROM   Songs
-- INNER JOIN Games               on Songs.idGame                   = Games.idGame
-- INNER JOIN Developers          on Developers.idDeveloper         = Games.idDeveloper
-- INNER JOIN Composers_Songs on Composers_Songs.idSong     = Songs.idSong
-- INNER JOIN Composers           on Composers_Songs.idComposer = Composers.idComposer
-- ORDER BY   Songs.spotifyPlayCount DESC;

