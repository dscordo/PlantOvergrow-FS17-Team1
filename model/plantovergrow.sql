CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `users` ADD PRIMARY KEY `users_id_primary`(`id`);
CREATE TABLE `plantinfo`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userid` INT NOT NULL,
    `pid` VARCHAR(255) NOT NULL,
    `lastwater` DATE NULL,
    `lastfert` DATE NULL,
    `notes` VARCHAR(255) NULL,
    `userimage` VARCHAR(255) NULL,
    `startdate` DATE NOT NULL
);
ALTER TABLE
    `plantinfo` ADD PRIMARY KEY `plantinfo_id_primary`(`id`);
ALTER TABLE
    `plantinfo` ADD PRIMARY KEY `plantinfo_userid_primary`(`userid`);
CREATE TABLE `wishlist`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userid` INT NOT NULL,
    `pid` VARCHAR(255) NOT NULL,
    `notes` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `wishlist` ADD PRIMARY KEY `wishlist_id_primary`(`id`);
ALTER TABLE
    `wishlist` ADD PRIMARY KEY `wishlist_userid_primary`(`userid`);