SET foreign_key_checks = 0;
DROP TABLE if exists plantinfo;
DROP TABLE if exists wishlist;
DROP TABLE if exists users;
SET foreign_key_checks = 1;

CREATE TABLE `users`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);


CREATE TABLE `plantinfo`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `userid` INT NOT NULL,
    `pid` VARCHAR(100) NULL,
    `pname` VARCHAR(100) NULL,
    `lastwater` DATE NULL,
    `lastfert` DATE NULL,
    `lastrepot` DATE NULL,
    `wfreq` VARCHAR(255) NULL,
    `fertfreq` VARCHAR(255) NULL,
    `notes` VARCHAR(255) NULL,
    `userimage` VARCHAR(255) NULL,
    `startdate` DATE NULL,
    PRIMARY KEY (id,userid),
    FOREIGN KEY (userid) REFERENCES users(id)
);



CREATE TABLE `wishlist`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `userid` INT NOT NULL,
    `pid` VARCHAR(100) NOT NULL,
    `image_url` VARCHAR(255),
    `notes` VARCHAR(255) NULL,
    PRIMARY KEY (id,userid),
    FOREIGN KEY (userid) REFERENCES users(id)
);

