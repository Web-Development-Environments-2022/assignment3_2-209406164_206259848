const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id)
{
    await DButils.execQuery(`INSERT INTO favorites VALUES ('${user_id}','${recipe_id}')`);
}

async function getFavoriteRecipes(user_id)
{
    const recipes_id = await DButils.execQuery(`SELECT recipe_id FROM favorites WHERE user_id='${user_id}'`);
    return recipes_id;
}

async function createPersonalRecipe(user_id , title, readyInMinutes, image, vegan, vegetarian, glutenFree, ingredients, instructions, servings)
{
    await DButils.execQuery(`INSERT INTO recipes(user_id , title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, instructions, ingredients, servings) 
    VALUES ('${user_id}', '${title}', '${readyInMinutes}', '${image}', '0', '${vegan}', '${vegetarian}', '${glutenFree}', '${instructions}', '${ingredients}', '${servings}')`);
    console.log("Added user recipe to database");
}

async function getPersonalRecipes(user_id)
{
    const recipes = await DButils.execQuery(`SELECT * FROM recipes WHERE user_id='${user_id}'`);
    return recipes;
}

exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.createPersonalRecipe = createPersonalRecipe;
exports.getPersonalRecipes = getPersonalRecipes;
