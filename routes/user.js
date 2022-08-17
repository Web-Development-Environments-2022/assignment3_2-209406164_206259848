/**
 * This class is responsible for handeling all the logged in user logic.
 * The class handles the favorites recipes, personal recipes and familt recipes actions.
 */
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
    res.status(401).send({ message: "User is not logged in", success: false });
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
    let was_marked = await user_utils.wasMarked(user_id, recipe_id);

    if (was_marked.length == 0)
    {
      await user_utils.markAsFavorite(user_id, recipe_id);
      res.status(200).send({ message: "The recipe successfully saved as favorite", success: true });
    }
    else
    {
      res.status(401).send({ message: "The recipe has already been marked as a favorite", success: false });
    }
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
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    
    // Extracting the recipe ids into array
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); 
    
    // Check if there is recipes that marked as favorites
    if (recipes_id_array.length == 0)
      res.status(200).send({ message: "No recipes have been marked as favorites", success: true });

    let results = await recipe_utils.getRecipesPreview(user_id, recipes_id_array);

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
router.post("/createPersonalRecipe", async (req, res, next) =>
{
  try
  {
  const user_id = req.session.user_id;
  let { title, readyInMinutes, image, vegan, vegetarian, glutenFree, ingredients, instructions, servings } = req.body;
  
  if (!title || !readyInMinutes || !image || vegan == undefined || vegetarian == undefined || glutenFree == undefined || !ingredients || !instructions || !servings)
    res.status(401).send({message: "One or more details are missing", success: false });

  vegan = yesNoToBinary(vegan);
  vegetarian = yesNoToBinary(vegetarian);
  glutenFree = yesNoToBinary(glutenFree);
  ingredients = JSON.stringify(ingredients);
  instructions = JSON.stringify(instructions);
  
  await user_utils.createPersonalRecipe(user_id , title, readyInMinutes, image, vegan, vegetarian, glutenFree, ingredients, instructions, servings);
  res.status(200).send({message: "Recipe created successfully", success: true});
  }
  catch (error)
  {
    next(error);
  }
});

function yesNoToBinary(yesNo)
{
  if (yesNo == "Yes")
    return 1;
  return 0;
}

/**
  * This path returns preview personal recipes of specific user
  */
router.get("/getPreviewPersonalRecipes", async (req, res, next) => 
{
  try 
  {
    const user_id = req.session.user_id;
    const preview_personal_recipes = await user_utils.getPreviewPersonalRecipes(user_id);
    
    // Check if there is recipes that was created
    if (preview_personal_recipes.length == 0)
      res.status(200).send({ message: "No personal recipes found", success: true });
    
    res.status(200).send(preview_personal_recipes);
  } 
  catch (error) 
  {
    next(error);
  }
});

/**
  * This path returns full personal recipes of specific user
  */
  router.get("/getFullPersonalRecipes/:recipeId", async (req, res, next) => 
  {
    try 
    {
      const user_id = req.session.user_id;
      const recipeId = req.params.recipeId;
      const full_personal_recipes = await user_utils.getFullPersonalRecipes(user_id, recipeId);

      // Check if there is recipes that was created
      if (full_personal_recipes.length == 0)
        res.status(200).send({ message: "No personal recipes found", success: true });

      res.status(200).send(full_personal_recipes);
    } 
    catch (error) 
    {
      next(error);
    }
  });

/**
 * This path returns 3 last watched recipes
 */
 router.get("/getLastWatched", async (req, res, next) => 
 {
  try
  {
    const user_id = req.session.user_id;
    let recipes_id = await user_utils.getThreeLastWatchedRecipes(user_id);
    
    // Extracting the recipe ids into array
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); 

    // Check if there is recipes that watched
    if (recipes_id_array.length == 0)
      res.status(200).send({ message: "No recipes were watched", success: true });
    
    let results = await recipe_utils.getRecipesPreview(user_id, recipes_id_array);
    res.status(200).send(results);
  }
  catch (error) 
  {
    next(error);
  }
});

// async function watched_or_favorite(req,recipe)
// {
//  if (req.session.user_id)
//  {
//    //Add if favorite
//    let favorite_entry = await DButils.execQuery(`SELECT * FROM favorites WHERE recipe_id='${recipe.id}' AND user_id='${req.session.user_id}'`);
   
//    if (favorite_entry.length == 0)
//      recipe.is_favorited = false;
//    else
//      recipe.is_favorited = true;

//    //Add if watched
//    let watched_entry = await DButils.execQuery(`SELECT id FROM history WHERE recipe_id='${recipe.id}' AND user_id='${req.session.user_id}'`);
//    if (watched_entry.length == 0)
//    {
//      recipe.is_watched = false;
//    }
//    else
//    {
//      recipe.is_watched = true;
//      DButils.execQuery(`DELETE FROM history WHERE id='${watched_entry[0]}'`);
//    }
//  }
//  return recipe;
// }

module.exports = router;
