

DROP TABLE if exists users;
CREATE TABLE `users`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

DROP TABLE if exists plantinfo;
CREATE TABLE `plantinfo`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `userid` INT NOT NULL,
    `pid` VARCHAR(100) NOT NULL,
    `lastwater` DATE NULL,
    `lastfert` DATE NULL,
    `lastrepot` DATE NULL,
    `notes` VARCHAR(255) NULL,
    `userimage` VARCHAR(255) NULL,
    `startdate` DATE NULL,
    PRIMARY KEY (id,userid),
    FOREIGN KEY (userid) REFERENCES users(id)
);


DROP TABLE if exists wishlist;
CREATE TABLE `wishlist`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `userid` INT NOT NULL,
    `pid` VARCHAR(100) NOT NULL,
    `notes` VARCHAR(255) NULL,
    PRIMARY KEY (id,userid),
    FOREIGN KEY (userid) REFERENCES users(id)
);


INSERT INTO `users`(`id`, `name`, `email`, `password`) VALUES (1000, "Maria", "maria@gmail.com", "1234");

INSERT INTO `plantinfo`(`id`, `userid`, `pid`, `lastwater`, `lastfert`, `lastrepot`, `notes`, `userimage`, `startdate`) 
VALUES (111, 1000, "cocos nucifera", "2022-03-03", "2022-02-02", "2020-08-08", "coco coquito coquero", "fotoquenotengo.jpg", "2018-10-10");

INSERT INTO `wishlist`(`id`, `userid`, `pid`, `notes`) VALUES (222, 1000, "alocasia cucullata", "oreja de elefante enano encapuchado");
