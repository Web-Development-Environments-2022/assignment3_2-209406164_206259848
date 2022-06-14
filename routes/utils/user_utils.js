const DButils = require("./DButils");

async function wasMarked(user_id, recipe_id)
{
    let recipes_id = await DButils.execQuery(`SELECT recipe_id FROM favorites WHERE user_id = '${user_id}' AND recipe_id = '${recipe_id}'`);
    return recipes_id;
}

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
}

async function getPreviewPersonalRecipes(user_id)
{
    const recipes = await DButils.execQuery(`SELECT id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree FROM recipes WHERE user_id='${user_id}'`);
    return recipes;
}

async function getFullPersonalRecipes(user_id)
{
    const recipes = await DButils.execQuery(`SELECT id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, instructions, ingredients, servings FROM recipes WHERE user_id='${user_id}'`);
    return recipes;
}
async function getFamilyRecipes()
{
    let family_recipes = await DButils.execQuery(`SELECT * FROM family`);
    return family_recipes;
}

async function getThreeLastWatchedRecipes(user_id)
{
    const watched_recipes = await DButils.execQuery(`SELECT * FROM watched WHERE user_id='${user_id}' ORDER BY time DESC LIMIT 3`);
    return watched_recipes;
}

exports.wasMarked = wasMarked;
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.createPersonalRecipe = createPersonalRecipe;
exports.getPreviewPersonalRecipes = getPreviewPersonalRecipes;
exports.getFullPersonalRecipes = getFullPersonalRecipes;
exports.getFamilyRecipes = getFamilyRecipes;
exports.getThreeLastWatchedRecipes = getThreeLastWatchedRecipes