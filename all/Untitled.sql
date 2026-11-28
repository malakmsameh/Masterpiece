CREATE TABLE `user` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(66) UNIQUE NOT NULL,
  `username` varchar(50) UNIQUE NOT NULL,
  `phone_number` varchar(15),
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `admin` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` varchar(15),
  `username` varchar(50) UNIQUE NOT NULL,
  `email` varchar(66) UNIQUE NOT NULL,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `recipes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `ingreadents` text,
  `calories` text,
  `measurements` text,
  `description` text,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `posts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `post_msg` text,
  `userid` integer NOT NULL,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `reply` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `post_id` integer NOT NULL,
  `reply` text,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `favorites` (
  `user_id` integer NOT NULL,
  `recipe_id` integer NOT NULL,
  PRIMARY KEY (`user_id`, `recipe_id`)
);

ALTER TABLE `posts` ADD FOREIGN KEY (`userid`) REFERENCES `user` (`id`);

ALTER TABLE `reply` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `reply` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `favorites` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `favorites` ADD FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);
