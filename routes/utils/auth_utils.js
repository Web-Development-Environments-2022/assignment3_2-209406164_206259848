const DButils = require("./DButils");

async function register(username, firstname, lastname, country, hash_password, email)
{
    await DButils.execQuery(`INSERT INTO users (username, firstname, lastname, country, password, email) 
    VALUES ('${username}', '${firstname}', '${lastname}','${country}', '${hash_password}', '${email}')`);
}

async function getUser(username)
{
    let user = await DButils.execQuery(`SELECT * FROM users WHERE username = '${username}'`);
    return user;
}

exports.register = register;
exports.getUser = getUser;