const axios = require("axios");
const DButils = require("./DButils");
const api_domain = "https://api.spoonacular.com/recipes";

/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */
async function getRecipeInformation(recipe_id) 
{
    return await axios.get(`${api_domain}/${recipe_id}/information`, 
    {
        params: 
        {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

async function getRecipeDetails(recipe_id) 
{
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, analyzedInstructions, extendedIngredients, servings } = recipe_info.data;

    let ingredients = extendedIngredients.map((ingredient) => 
    { 
        return ingredient.original;
    });

    let instructions = analyzedInstructions.map((instruction) =>
    {
        return instruction.steps.map((step) =>
        {
            return step.step;
        });
    });

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        instructions: instructions,
        ingredients: ingredients,
        servings: servings,
        markAsFavorite: false,
        watched: false
    }
}


async function getRecipesPreview(recipes_ids_list) 
{
    let promises = [];
    recipes_ids_list.map((id) => 
    { 
        promises.push(getRecipeInformation(id))
    });
    let info_res = await Promise.all(promises);
    return extractPreviewRecipeDetails(info_res);
}


async function extractPreviewRecipeDetails(recipes_info) 
{
    let is_watched;
    return recipes_info.map((recipe_info) => 
    {
        // check the data type so it can work with different types od data
        let data = recipe_info;
        
        if (recipe_info.data) 
            data = recipe_info.data;

        const { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = data;

        is_watched = watched(1, id);



        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            image: image,
            aggregateLikes: aggregateLikes,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree,
            is_watched : is_watched

        }
    })
}

async function getThreeRandomRecipes() 
{
    let random_pool = await getRandomRecipes();
    let filterd_random_pool = random_pool.data.recipes.filter((random) => (random.instructions != "") && (random.image && random.image != ""));
    if (filterd_random_pool.length < 3) 
        return getThreeRandomRecipes();
    return extractPreviewRecipeDetails([filterd_random_pool[0], filterd_random_pool[1], filterd_random_pool[2]]);
}


async function getRandomRecipes() 
{
    const random_recipes = await axios.get(`${api_domain}/random`, 
    {
        params: 
        {
            number: 3,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return random_recipes;
}


async function searchRecipes(search_details)
{
    console.log(search_details)
    let results = await axios.get(`${api_domain}/complexSearch?`, { params: search_details });

    if (results.data.totalResults == 0)
        return "Found 0 search results";

    let results_data = results.data.results;
    let results_id = [];
    results_data.map((element) => { results_id.push(element.id); });
    console.log(results_id);

    let promises = [];
    results_id.map((id) => 
    { 
        promises.push(getRecipeDetails(id))
    });
    let recipes_results = await Promise.all(promises);

    promises = [];
    recipes_results.map((result) => 
    { 
        promises.push( delete result.ingredients)
        promises.push( delete result.servings)
    });
    await Promise.all(promises);

    return recipes_results;
}

async function watched(req,recipe)
{
 if (req.session && req.session.user_id)
 {
   //Add if watched
   let watched_entry = await DButils.execQuery(`SELECT id FROM history WHERE recipe_id='${recipe.id}' AND user_id='${req.session.user_id}'`);
   if (watched_entry.length == 0)
   {
    return false;
   }
   else
   {
     return true;
   }
 }
 else
 {
    return false;
 }
}

async function favorited(req,recipe)
{
 if (req.session && req.session.user_id)
 {
   //Add if favorite
   let favorite_entry = await DButils.execQuery(`SELECT * FROM favorites WHERE recipe_id='${recipe.id}' AND user_id='${req.session.user_id}'`);
   
   if (favorite_entry.length == 0)
     return false;
   else
     return true;

 }
 else
 {
    return false;
 }
}

exports.getRecipeDetails = getRecipeDetails;
exports.getThreeRandomRecipes = getThreeRandomRecipes;
exports.getRecipesPreview = getRecipesPreview;
exports.searchRecipes = searchRecipes;
exports.watched = watched;
exports.favorited = favorited;