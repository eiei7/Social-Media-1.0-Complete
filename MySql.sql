SHOW DATABASES;

CREATE DATABASE mern;

USE mern;

CREATE TABLE users(
    id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(100),
    gender VARCHAR(10),
    age INT,
    date_of_birth DATETIME,
    location VARCHAR(100),
    occupation VARCHAR(100),
    profilePic VARCHAR(255),
    coverPic VARCHAR(255),
    impressions VARCHAR(100),
    viewprofile VARCHAR(100),
    website VARCHAR(100)
);

DESCRIBE users;

CREATE TABLE friendship(
    followedId INT,
    followerId INT,
    PRIMARY KEY (followedId, followerId),
    FOREIGN KEY frienship(followedId, followerId) REFERENCES users(id)
);
//they cannot be equal because one person cannot follow himself.

DESCRIBE friendship;

CREATE TABLE posts(
    id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    uid INT,
    location VARCHAR(100),
    description VARCHAR(255),
    date DATETIME,
    userPic VARCHAR(255),
    picturePath VARCHAR(255),
    FOREIGN KEY (uid) REFERENCES users(id),
);

DESCRIBE posts;

ALTER TABLE posts ADD FOREIGN KEY (picturePath) REFERENCES users(picturePath);

CREATE TABLE likes(
    uid INT,
    pid INT,
    PRIMARY KEY (uid, pid),
    FOREIGN KEY (pid) REFERENCES posts(id),
    FOREIGN KEY (uid) REFERENCES users(id)
);

DESCRIBE likes;

CREATE TABLE comments(
    uid INT,
    pid INT,
    date DATETIME,
    content VARCHAR(255),
    PRIMARY KEY (uid, pid),
    FOREIGN KEY (uid) REFERENCES users(id),
    FOREIGN KEY (pid) REFERENCES posts(id),
);

DESCRIBE comments;

ALTER TABLE posts CONVERT TO CHARACTER SET utf8mb4;//make sure emoji is readable