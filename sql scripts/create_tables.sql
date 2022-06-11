CREATE TABLE `users` 
(
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
)
 ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

------------------------------------------------------------------

CREATE TABLE `favorites` 
(
  `user_id` int NOT NULL,
  `recipe_id` int NOT NULL
) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

------------------------------------------------------------------

CREATE TABLE `recipes` 
(
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `image` varchar(90) NOT NULL,
  `timeToMake` int NOT NULL,
  `likes` int NOT NULL,
  `vegetarian` tinyint NOT NULL,
  `vegan` tinyint NOT NULL,
  `glutenFree` tinyint NOT NULL,
  `ingredients` json NOT NULL,
  `instructions` json NOT NULL,
  `servngs` int NOT NULL,
  PRIMARY KEY (`recipe_id`)
)
 ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;