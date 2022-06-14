-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `family`
--

DROP TABLE IF EXISTS `family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `family` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `readyInMinutes` int NOT NULL,
  `image` varchar(100) NOT NULL,
  `aggregateLikes` int NOT NULL,
  `vegan` tinyint NOT NULL,
  `vegetarian` tinyint NOT NULL,
  `glutenFree` tinyint NOT NULL,
  `instructions` json NOT NULL,
  `ingredients` json NOT NULL,
  `servings` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family`
--

LOCK TABLES `family` WRITE;
/*!40000 ALTER TABLE `family` DISABLE KEYS */;
INSERT INTO `family` VALUES (8,1,'Vegan Pumpkin Pie Butter Cups',45,'https://spoonacular.com/recipeImages/664474-556x370.jpg',0,0,0,0,'[[\"Line 16 muffin cups with paper or silicone liners. The butter cups are easier to take out if you use paper liners.\", \"In a food processor, blend all of the chocolate crust ingredients together.\", \"Drop a tablespoon of the crust into each cup and flatten it at the bottom.\", \"In a small bowl, mix the ingredients for the pumpkin filling together. Freeze it for 5-10 minutes.\", \"Mix the chocolate shell ingredients together until it looks like chocolate sauce.\", \"Remove the pumpkin filling and drop -tablespoon dollops of the pie filling into each cup.\", \"Pour about 2 teaspoons of chocolate sauce into each cup so that you could just about cover up the pumpkin filling.\", \"Freeze the cups for 30 minutes to an hour.\", \"Store in the refrigerator. The chocolate will turn gooey if you leave the cups out in room temperature for a long time.\", \"Enjoy!\"]]','[\"Raw Chocolate Pie Crust\", \"2 Tbs cocoa powder\", \"½ cup raw walnuts\", \"½ cup unsweetened shredded coconut\", \"½ cup pitted medjool dates (about 10 – 12)\", \"Chocolate Shell\", \"½ cup cocoa powder\", \"¼ cup + 2 Tbs coconut oil, melted\", \"3½ Tbs maple syrup\", \"4 Tbs pumpkin puree (*not the pumpkin pie puree)\", \"3 Tbs peanut butter, creamy or chunky\", \"1½ Tbs maple syrup\", \"1 tsp chia seeds\", \"1 pinch of pumpkin pie spice or cinnamon\"]',16),(9,1,'All Day Simple Slow-Cooker FALL OFF the BONE Ribs',45,'https://spoonacular.com/recipeImages/632075-556x370.jpg',0,0,0,1,'[[\"Portion 2 slabs to allow them to fit in the slow-cooker easily.\", \"Season each piece with salt, pepper and onion salt.\", \"Cover bottom of Slow-cooker with BBQ sauce\", \"Add broth. (I only do this so the BBQ sauce doesnt burn up and this step could possibly be skipped)\", \"Place sectioned/portioned ribs into slow-cooker, brushing them with BBQ sauce as you set them in.\", \"Layer them in so they all fit.\", \"Cook on low for 8-10 hours or until they fall off the bone.\", \"Remove from slow-cooker and transfer them to a foil lined baking sheet.\", \"Brush each portion with BBQ sauce\", \"Broil for 5 minutes or until the sauce starts to bubble and caramelize.\", \"Remove from broiler let cool slightly\", \"ENJOY!!!!!\"]]','[\"2 Large Slabs of Pork Ribs\", \"¼ Cup Broth (Beef or Chicken-either works fine, you could even use water)\", \"40 oz. Bottle of your favorite BBQ Sauce. I didnt need that much but its what I had and didnt measure but it leaves extra for dipping.\", \"Salt, Pepper and Garlic Powder to taste\"]',4),(10,2,'Watermelon, Feta And Mint Salad',45,'https://spoonacular.com/recipeImages/665041-556x370.jpg',0,0,1,1,'[[\"Cut the watermelon into big wedges, then cut the flesh away from the skin. Slice the flesh into bite sized pieces.\", \"Cut the cucumber in half then half lengthways too. Use a potato peeler to slice ribbons off the cucumber.\", \"Arrange the lettuce leaves in a large bowl, top with the watermelon, cucumber, feta and mint.Finally place all the dressing ingredients together (juice of 1/2 lemon, olive oil, honey) in a small bowl and whisk together with a fork. Season to taste.\", \"Drizzle the dressing over the salad and serve.\"]]','[\"1 tbsp clear honey\", \"1/2 cucumber, washed\", \"1 head curly leaf lettuce\", \"1 package feta cheese, sliced\", \"3 tbsp chopped fresh mint\", \"1/2 lemon\", \"4 tbsp olive oil\", \"pepper\", \"salt\", \"1 pound ripe watermelon\"]',6);
/*!40000 ALTER TABLE `family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `user_id` int NOT NULL,
  `recipe_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,631890);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `readyInMinutes` int NOT NULL,
  `image` varchar(100) NOT NULL,
  `aggregateLikes` int NOT NULL,
  `vegan` tinyint NOT NULL,
  `vegetarian` tinyint NOT NULL,
  `glutenFree` tinyint NOT NULL,
  `instructions` json NOT NULL,
  `ingredients` json NOT NULL,
  `servings` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (8,1,'Vegan Pumpkin Pie Butter Cups',45,'https://spoonacular.com/recipeImages/664474-556x370.jpg',0,0,0,0,'[[\"Line 16 muffin cups with paper or silicone liners. The butter cups are easier to take out if you use paper liners.\", \"In a food processor, blend all of the chocolate crust ingredients together.\", \"Drop a tablespoon of the crust into each cup and flatten it at the bottom.\", \"In a small bowl, mix the ingredients for the pumpkin filling together. Freeze it for 5-10 minutes.\", \"Mix the chocolate shell ingredients together until it looks like chocolate sauce.\", \"Remove the pumpkin filling and drop -tablespoon dollops of the pie filling into each cup.\", \"Pour about 2 teaspoons of chocolate sauce into each cup so that you could just about cover up the pumpkin filling.\", \"Freeze the cups for 30 minutes to an hour.\", \"Store in the refrigerator. The chocolate will turn gooey if you leave the cups out in room temperature for a long time.\", \"Enjoy!\"]]','[\"Raw Chocolate Pie Crust\", \"2 Tbs cocoa powder\", \"½ cup raw walnuts\", \"½ cup unsweetened shredded coconut\", \"½ cup pitted medjool dates (about 10 – 12)\", \"Chocolate Shell\", \"½ cup cocoa powder\", \"¼ cup + 2 Tbs coconut oil, melted\", \"3½ Tbs maple syrup\", \"4 Tbs pumpkin puree (*not the pumpkin pie puree)\", \"3 Tbs peanut butter, creamy or chunky\", \"1½ Tbs maple syrup\", \"1 tsp chia seeds\", \"1 pinch of pumpkin pie spice or cinnamon\"]',16),(9,1,'All Day Simple Slow-Cooker FALL OFF the BONE Ribs',45,'https://spoonacular.com/recipeImages/632075-556x370.jpg',0,0,0,1,'[[\"Portion 2 slabs to allow them to fit in the slow-cooker easily.\", \"Season each piece with salt, pepper and onion salt.\", \"Cover bottom of Slow-cooker with BBQ sauce\", \"Add broth. (I only do this so the BBQ sauce doesnt burn up and this step could possibly be skipped)\", \"Place sectioned/portioned ribs into slow-cooker, brushing them with BBQ sauce as you set them in.\", \"Layer them in so they all fit.\", \"Cook on low for 8-10 hours or until they fall off the bone.\", \"Remove from slow-cooker and transfer them to a foil lined baking sheet.\", \"Brush each portion with BBQ sauce\", \"Broil for 5 minutes or until the sauce starts to bubble and caramelize.\", \"Remove from broiler let cool slightly\", \"ENJOY!!!!!\"]]','[\"2 Large Slabs of Pork Ribs\", \"¼ Cup Broth (Beef or Chicken-either works fine, you could even use water)\", \"40 oz. Bottle of your favorite BBQ Sauce. I didnt need that much but its what I had and didnt measure but it leaves extra for dipping.\", \"Salt, Pepper and Garlic Powder to taste\"]',4),(10,1,'Watermelon, Feta And Mint Salad',45,'https://spoonacular.com/recipeImages/665041-556x370.jpg',0,0,1,1,'[[\"Cut the watermelon into big wedges, then cut the flesh away from the skin. Slice the flesh into bite sized pieces.\", \"Cut the cucumber in half then half lengthways too. Use a potato peeler to slice ribbons off the cucumber.\", \"Arrange the lettuce leaves in a large bowl, top with the watermelon, cucumber, feta and mint.Finally place all the dressing ingredients together (juice of 1/2 lemon, olive oil, honey) in a small bowl and whisk together with a fork. Season to taste.\", \"Drizzle the dressing over the salad and serve.\"]]','[\"1 tbsp clear honey\", \"1/2 cucumber, washed\", \"1 head curly leaf lettuce\", \"1 package feta cheese, sliced\", \"3 tbsp chopped fresh mint\", \"1/2 lemon\", \"4 tbsp olive oil\", \"pepper\", \"salt\", \"1 pound ripe watermelon\"]',6),(13,1,'Watermelon, Feta And Mint Salad',45,'https://spoonacular.com/recipeImages/665041-556x370.jpg',0,0,1,1,'[[\"Cut the watermelon into big wedges, then cut the flesh away from the skin. Slice the flesh into bite sized pieces.\", \"Cut the cucumber in half then half lengthways too. Use a potato peeler to slice ribbons off the cucumber.\", \"Arrange the lettuce leaves in a large bowl, top with the watermelon, cucumber, feta and mint.Finally place all the dressing ingredients together (juice of 1/2 lemon, olive oil, honey) in a small bowl and whisk together with a fork. Season to taste.\", \"Drizzle the dressing over the salad and serve.\"]]','[\"1 tbsp clear honey\", \"1/2 cucumber, washed\", \"1 head curly leaf lettuce\", \"1 package feta cheese, sliced\", \"3 tbsp chopped fresh mint\", \"1/2 lemon\", \"4 tbsp olive oil\", \"pepper\", \"salt\", \"1 pound ripe watermelon\"]',6),(14,1,'Watermelon, Feta And Mint Salad',45,'https://spoonacular.com/recipeImages/665041-556x370.jpg',0,0,1,1,'[[\"Cut the watermelon into big wedges, then cut the flesh away from the skin. Slice the flesh into bite sized pieces.\", \"Cut the cucumber in half then half lengthways too. Use a potato peeler to slice ribbons off the cucumber.\", \"Arrange the lettuce leaves in a large bowl, top with the watermelon, cucumber, feta and mint.Finally place all the dressing ingredients together (juice of 1/2 lemon, olive oil, honey) in a small bowl and whisk together with a fork. Season to taste.\", \"Drizzle the dressing over the salad and serve.\"]]','[\"1 tbsp clear honey\", \"1/2 cucumber, washed\", \"1 head curly leaf lettuce\", \"1 package feta cheese, sliced\", \"3 tbsp chopped fresh mint\", \"1/2 lemon\", \"4 tbsp olive oil\", \"pepper\", \"salt\", \"1 pound ripe watermelon\"]',6),(15,1,'Watermelon, Feta And Mint Salad',50,'https://spoonacular.com/recipeImages/665041-556x370.jpg',0,0,1,1,'[[\"Cut the watermelon into big wedges, then cut the flesh away from the skin. Slice the flesh into bite sized pieces.\", \"Cut the cucumber in half then half lengthways too. Use a potato peeler to slice ribbons off the cucumber.\", \"Arrange the lettuce leaves in a large bowl, top with the watermelon, cucumber, feta and mint.Finally place all the dressing ingredients together (juice of 1/2 lemon, olive oil, honey) in a small bowl and whisk together with a fork. Season to taste.\", \"Drizzle the dressing over the salad and serve.\"]]','[\"1 tbsp clear honey\", \"1/2 cucumber, washed\", \"1 head curly leaf lettuce\", \"1 package feta cheese, sliced\", \"3 tbsp chopped fresh mint\", \"1/2 lemon\", \"4 tbsp olive oil\", \"pepper\", \"salt\", \"1 pound ripe watermelon\"]',6),(16,2,'Watermelon, Feta And Mint Salad',50,'https://spoonacular.com/recipeImages/665041-556x370.jpg',0,0,1,1,'[[\"Cut the watermelon into big wedges, then cut the flesh away from the skin. Slice the flesh into bite sized pieces.\", \"Cut the cucumber in half then half lengthways too. Use a potato peeler to slice ribbons off the cucumber.\", \"Arrange the lettuce leaves in a large bowl, top with the watermelon, cucumber, feta and mint.Finally place all the dressing ingredients together (juice of 1/2 lemon, olive oil, honey) in a small bowl and whisk together with a fork. Season to taste.\", \"Drizzle the dressing over the salad and serve.\"]]','[\"1 tbsp clear honey\", \"1/2 cucumber, washed\", \"1 head curly leaf lettuce\", \"1 package feta cheese, sliced\", \"3 tbsp chopped fresh mint\", \"1/2 lemon\", \"4 tbsp olive oil\", \"pepper\", \"salt\", \"1 pound ripe watermelon\"]',6);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'eden','eden','chai','hadera','$2b$10$2rje.5Oo2hLLWzKaGieOFOJRGNUO8F/a92P/krXwZ4jgU9pK4rtKC','eden@gmail.com'),(2,'arie','arie','katz','beersheva','$2b$10$JS5lEai1ecsv.VHdIyBb/u1N0bxnyZ416osptK6HG2aeAbXn4yrUa','arie@gmail.com'),(7,'arie2','arie','katz','beersheva','$2b$10$Y.OkT2MdgRj.6zZgUjDPeu3WLuO4E5YewMVAkmdv3y0BL7QtubaaG','arie@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watched`
--

DROP TABLE IF EXISTS `watched`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watched` (
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `recipe_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watched`
--

LOCK TABLES `watched` WRITE;
/*!40000 ALTER TABLE `watched` DISABLE KEYS */;
INSERT INTO `watched` VALUES ('2022-06-14 11:56:45',2,664474),('2022-06-14 11:57:25',2,665573),('2022-06-14 11:57:38',2,324694),('2022-06-14 11:58:03',1,632075),('2022-06-14 11:58:10',2,632075);
/*!40000 ALTER TABLE `watched` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-14 17:38:59
