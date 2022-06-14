const DButils = require("./utils/DButils");
/** 
 * This class is responsible for handeling all the user (logged in and guests) logic.
 * The class handles the random, and search actions.
 */

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
 * Searcing function
 */
 router.get("/search", async (req, res, next) => 
{
  try
  {
    let search_details = 
    {
      query: req.body.query,
      cuisine: req.body.cuisine,
      diet: req.body.diet,
      intolerances: req.body.intolerances,
      instructionsRequired: true,
      number: req.body.number,
      apiKey: process.env.spooncular_apiKey
    }
    let search_resualts = await recipes_utils.searchRecipes(search_details);
    res.send(search_resualts);
  }
  catch(error)
  {
    next(error);
  }
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

