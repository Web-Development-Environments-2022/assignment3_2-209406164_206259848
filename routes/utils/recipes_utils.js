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

async function getRecipeDetails(user_id, recipe_id) 
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
        is_watched : await isWatched(user_id, recipe_id),
        is_favoried : await isFavorited(user_id, recipe_id)
    }
}

async function getRecipesPreview(user_id, recipes_ids_list) 
{
    let promises = [];
    recipes_ids_list.map((id) => 
    { 
        promises.push(getRecipeInformation(id))
    });
    let info_res = await Promise.all(promises);
    return extractPreviewRecipeDetails(user_id, info_res);
}

async function extractPreviewRecipeDetails(user_id, recipes_info) 
{
    const promises = (recipes_info.map(async (recipe_info) => 
    {
        // check the data type so it can work with different types od data
        let data = recipe_info;
        
        if (recipe_info.data) 
            data = recipe_info.data;

        const { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = data;

        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            image: image,
            aggregateLikes: aggregateLikes,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree,
            is_watched : await isWatched(user_id, id),
            is_favoried : await isFavorited(user_id, id)
        }
    }))

    return Promise.all(promises);
}

async function getThreeRandomRecipes(user_id) 
{
    let random_pool = await getRandomRecipes();
    let filterd_random_pool = random_pool.data.recipes.filter((random) => (random.instructions != "") && (random.image && random.image != ""));
    if (filterd_random_pool.length < 3)
        return getThreeRandomRecipes();
    return extractPreviewRecipeDetails(user_id, [filterd_random_pool[0], filterd_random_pool[1], filterd_random_pool[2]]);
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

async function searchRecipes(user_id, search_details)
{
    let results = await axios.get(`${api_domain}/complexSearch?`, { params: search_details });

    if (results.data.totalResults == 0)
        return "Found 0 search results";

    let results_data = results.data.results;
    let results_id = [];
    results_data.map((element) => { results_id.push(element.id); });

    let promises = [];
    results_id.map((id) => 
    { 
        promises.push(getRecipeDetails(user_id, id))
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

async function isFavorited(user_id, recipe_id)
{
    let result = await DButils.execQuery(`SELECT recipe_id FROM favorites WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`);
    if (result.length == 0)
        return false;
    return true;
}

async function isWatched(user_id, recipe_id)
{
    let result = await DButils.execQuery(`SELECT recipe_id FROM watched WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`);
    if (result.length == 0)
        return false;
    return true;
}

async function addToWatched(user_id, recipe_id)
{
    // Check if user not logged in
    if (user_id == -1) return;

    // Check if the user has already watched the recipe
    let watched = await isWatched(user_id, recipe_id)
    if (!watched)
        await DButils.execQuery(`INSERT INTO watched(user_id, recipe_id) VALUES ('${user_id}','${recipe_id}')`);
    else
        await DButils.execQuery(`UPDATE watched SET time = CURRENT_TIMESTAMP WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`);
}

exports.getRecipeDetails = getRecipeDetails;
exports.getThreeRandomRecipes = getThreeRandomRecipes;
exports.getRecipesPreview = getRecipesPreview;
exports.searchRecipes = searchRecipes;
exports.isWatched = isWatched;
exports.isFavorited = isFavorited;
exports.addToWatched = addToWatched;