var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));


/**
 * This path returns 3 random preview recipes
 */
 router.get("/Random", async (req, res, next) => 
 {
  try 
  {
    let random_recipes = await recipes_utils.getThreeRandomRecipes();
    res.send(random_recipes);
  } 
  catch (error) 
  {
    next(error);
  }
});

  /**
 * This path returns a full list of all family recipes
 */
router.get("/getFamilyRecipes", async (req, res, next) => 
{
  try
  {
    let family_recipes = await recipes_utils.getFamilyRecipes();
    res.send(family_recipes);
  } 
  catch (error) 
  {
    next(error);
  }
});
  

/**
 * Searcing function
 */
 router.get("/search/:query/results/:numOfResults", async (req, res, next) => 
 {
  const { query, numOfResults } = req.params;
  search_details = {};
  search_details.query = query;
  search_details.number = numOfResults;
  search_details.instructionsRequired = true;
  search_details.apiKey = process.env.spooncular_apiKey;
  await recipes_utils.extractSearch(req.query, search_details);
  recipes_utils
    .searchRecipes(search_details)
    .catch((error) =>
    {
      res.status(500).send(error);
    });
 });

/**
 * This path returns a full details of a recipe by its id
 */
 router.get("/:recipeId", async (req, res, next) => 
 {
   try 
   {
     const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
     res.send(recipe);
   } 
   catch (error) 
   {
     next(error);
   }
 });

module.exports = router;