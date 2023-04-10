CREATE SCHEMA `eurocoders_task`;
USE `eurocoders_task`;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  num_photos INT DEFAULT 0,
  date DATETIME
);

CREATE TABLE photos (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  img VARCHAR(255) NOT NULL,
  date DATETIME,
  cat VARCHAR(45) NOT NULL,
  title VARCHAR(45) NOT NULL,
  uid INT NOT NULL,
  FOREIGN KEY (uid) REFERENCES users(id)
);

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  comment TEXT NOT NULL,
  date DATETIME,
  pid INT NOT NULL,
  FOREIGN KEY (pid) REFERENCES photos(id)
);

CREATE TABLE emails (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `from` VARCHAR(255) NOT NULL,
  `to` VARCHAR(255) NOT NULL,
  message VARCHAR(1000) NOT NULL
);

DELIMITER $$
CREATE TRIGGER max_photos_per_user
BEFORE INSERT ON photos
FOR EACH ROW 
BEGIN
  DECLARE photo_count INT;
  SELECT COUNT(*) INTO photo_count FROM photos WHERE uid = NEW.uid;
  IF photo_count >= 10 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cannot add more than 10 photos per user';
  END IF;
END$$

CREATE TRIGGER max_comments_per_photo
BEFORE INSERT ON comments
FOR EACH ROW 
BEGIN
  DECLARE comment_count INT;
  SELECT COUNT(*) INTO comment_count FROM comments WHERE pid = NEW.pid;
  IF comment_count >= 10 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cannot add more than 10 comments per photo';
  END IF;
END$$
