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
    let user_id;
    if (!req.session.user_id)
      user_id = -1;
    else
      user_id = req.session.user_id;
    
    let random_recipes = await recipes_utils.getThreeRandomRecipes(user_id);
    res.send(random_recipes);
  }
  catch (error) 
  {
    next(error);
  }
});

/**
 * This path returns recipes from searcing function
 */
 router.post("/search", async (req, res, next) => 
{
  try
  {
    let user_id;
    if (!req.session.user_id)
      user_id = -1;
    else
      user_id = req.session.user_id;

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

    const search_resualts = await recipes_utils.searchRecipes(user_id, search_details);
    res.status(200).send(search_resualts);
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
    let user_id;
    if (!req.session.user_id)
      user_id = -1;
    else
      user_id = req.session.user_id;

    const recipe_id = req.params.recipeId;
    const recipe = await recipes_utils.getRecipeDetails(user_id, recipe_id);
    await recipes_utils.addToWatched(user_id, recipe_id);
    res.status(200).send(recipe);
   }
   catch (error) 
   {
     next(error);
   }
 });

module.exports = router;

