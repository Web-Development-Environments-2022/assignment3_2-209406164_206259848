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
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
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


function extractPreviewRecipeDetails(recipes_info) 
{
    return recipes_info.map((recipe_info) => 
    {
        // check the data type so it can work with different types od data
        let data = recipe_info;
        
        if (recipe_info.data) 
        {
            data = recipe_info.data;
        }
        
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
        }
    })
}


async function getThreeRandomRecipes() 
{
    let random_pool = await getRandomRecipes();
    let filterd_random_pool = random_pool.data.recipes.filter((random) => (random.instructions != "") && (random.image && random.image != ""));
    if (filterd_random_pool.length < 3) 
    {
        return getThreeRandomRecipes();
    }
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


async function getFamilyRecipes()
{
    let family_recipes = await DButils.execQuery(`SELECT * FROM recipes WHERE user_id IN (1,2)`);
    return family_recipes;
}


async function searchRecipes(search_details)
{
    let results = await axios.get(`${procces.env.api_domain}/search?${process.env.spooncular_apiKey}`,
    {
        params: search_details
    }
    );

    let results_data = results.data.results;
    let results_id = [];
    results_data.map((element) => 
    {
        results_id.push(element.id);
    });

    results_id

   let results_get_details = [];
   results_id.map((recipe_id) => results_get_details.push( getRecipeDetails(recipe_id)));
   let results_recipes = await Promise.all(results_get_details);  
    return results_recipes;
}


async function extractSearch(search_params, search)
{
    let filter_list = ["cusine", "diet", "intolerance"];
    filter_list.forEach((filter) =>
    {
        if (search_params[filter])
        {
           search[filter] = search_params[filter];
        }
    });
}


exports.getRecipeDetails = getRecipeDetails;
exports.getThreeRandomRecipes = getThreeRandomRecipes;
exports.getRecipesPreview = getRecipesPreview;
exports.getFamilyRecipes = getFamilyRecipes;
exports.extractSearch = extractSearch;
exports.searchRecipes = searchRecipes;