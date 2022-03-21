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
    `notes` VARCHAR(255) NULL,
    PRIMARY KEY (id,userid),
    FOREIGN KEY (userid) REFERENCES users(id)
);



/* INSERT INTO `users`(`id`, `name`, `email`, `password`) VALUES (1, "Maria", "maria@gmail.com", "$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W");
  */


/* INSERT INTO `plantinfo`(`id`, `userid`, `pid`, `pname`, `lastwater`, `lastfert`, `lastrepot`, `wfreq`, `fertfreq`, `notes`, `userimage`, `startdate`) 
VALUES (1, 1, "cocos nucifera", "cocoloco", "2022-03-03", "2022-02-02", "2020-08-08", "1", "30", "coco coquito coquero", "coco.jpg", "2018-10-10"),
 (2, 1, "anguloa uniflora", "Lola la orquidea", "2022-03-12", "2021-02-02", "2018-08-08", "2", "60", "orquidea azul", "orquidea.jpg", "2017-01-10");
(3, 1, "burgundy phalaenopsis", "Borgoña Madroña", "2022-03-12", "2021-02-02", "2018-08-08", "2", "60", "muy buenas tardes", "borgoña.jpg", "2017-01-10");
 */
/* INSERT INTO `wishlist`(`id`, `userid`, `pid`, `notes`) 
VALUES (1, 1, "perico palotes", "pues muy bien por aquí"); */

