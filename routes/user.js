var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) 
{
  if (req.session && req.session.user_id) 
  {
    DButils.execQuery("SELECT user_id FROM users").then((users) => 
    {
      if (users.find((x) => x.user_id === req.session.user_id)) 
      {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } 
  else 
  {
    res.sendStatus(401);
  }
});

/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/addToFavorites', async (req,res, next) => 
{
  try
  {
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
  } 
  catch(error)
  {
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/getFavorites', async (req,res,next) => 
{
  try
  {
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  }
  catch(error)
  {
    next(error); 
  }
});

 /**
  * This path gets body with recipe ingredients and instructions and save this recipe in the personal recipes list of the logged-in user
  */
router.post("/createRecipe", async (req, res, next) =>
{
  let user_id = req.session.user_id;
  let { title, readyInMinutes, image, vegan, vegetarian, glutenFree, ingredients, instructions, servings } = req.body;

  vegan = boolToBin(vegan);
  vegetarian = boolToBin(vegetarian);
  glutenFree = boolToBin(glutenFree);
  ingredients = JSON.stringify(ingredients);
  instructions = JSON.stringify(instructions);
  try
  {
    await user_utils.createPersonalRecipe(user_id , title, readyInMinutes, image, vegan, vegetarian, glutenFree, ingredients, instructions, servings);
    res.status(200).send({message: "Recipe created successfully", success: true});
  }
  catch (error)
  {
    next(error);
  }
});
 
function boolToBin(boolean)
{
  if (boolean)
    return 1;
  return 0;
}

  /**
 * This path returns a full list of all user recipes
 */
router.get("/getRecipes", async (req, res, next) => {
  try 
  {
    const personal_recipes = await user_utils.getPersonalRecipes(req.session.user_id);
    res.send(personal_recipes);
  } 
  catch (error) 
  {
    next(error);
  }
});

module.exports = router;
