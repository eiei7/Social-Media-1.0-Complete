CREATE TABLE `users` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255),
  `gender` varchar(255),
  `age` int,
  `date_of_birth` datetime,
  `location` varchar(255),
  `occupation` varchar(255),
  `profilePic` varchar(255),
  `coverPic` varchar(255),
  `impressions` varchar(255),
  `viewprofile` varchar(255),
  `website` varchar(255)
);

CREATE TABLE `friendship` (
  `followerId` int,
  `followedId` int,
  PRIMARY KEY (`followedId`),
  PRIMARY KEY (`followerId`)
);

CREATE TABLE `posts` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `uid` int,
  `location` varchar(255),
  `description` varchar(255),
  `date` datetime,
  `picturePath` varchar(255)
);

CREATE TABLE `likes` (
  `uid` int,
  `pid` int,
  PRIMARY KEY (`uid`),
  PRIMARY KEY (`pid`)
);

CREATE TABLE `comments` (
  `uid` int,
  `pid` int,
  `date` datetime,
  `content` varchar(255),
  PRIMARY KEY (`uid`),
  PRIMARY KEY (`pid`)
);

CREATE INDEX `users_index_0` ON `users` (`id`);

CREATE INDEX `users_index_1` ON `users` (`firstName`, `lastName`);

CREATE INDEX `users_index_2` ON `users` (`email`);

ALTER TABLE `friendship` ADD FOREIGN KEY (`followerId`) REFERENCES `users` (`id`);

ALTER TABLE `friendship` ADD FOREIGN KEY (`followedId`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`uid`) REFERENCES `users` (`id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`uid`) REFERENCES `users` (`id`);

ALTER TABLE `likes` ADD FOREIGN KEY (`pid`) REFERENCES `posts` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`uid`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`pid`) REFERENCES `posts` (`id`);
