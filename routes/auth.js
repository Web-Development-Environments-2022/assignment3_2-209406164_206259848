var express = require("express");
var router = express.Router();
const MySql = require("../routes/utils/MySql");
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcrypt");

router.post("/Register", async (req, res, next) => 
{
  try 
  {
    // Check if user already logged in
    if (req.session.user_id != undefined)
    throw { status: 401, message: "User already logged in" };

    let user_details = 
    {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      country: req.body.country,
      password: req.body.password,
      email: req.body.email,
      // profilePic: req.body.profilePic
    }

    // Check if parameters exists
    if (!user_details.username || !user_details.firstname || !user_details.lastname || !user_details.country || !user_details.password || !user_details.email) 
      throw { status: 401, message: "One or more arguments are missing" };

    // Validate parameters

    // Check if username already exists
    let users = [];
    users = await DButils.execQuery("SELECT username from users");

    if (users.find((x) => x.username === user_details.username))
      throw { status: 401, message: "Username already exists" };

    // Add the new username
    let hash_password = bcrypt.hashSync(user_details.password, parseInt(process.env.bcrypt_saltRounds));
    
    await DButils.execQuery(
      `INSERT INTO users (username, firstname, lastname, country, password, email) 
      VALUES ('${user_details.username}', '${user_details.firstname}', '${user_details.lastname}',
      '${user_details.country}', '${hash_password}', '${user_details.email}')`
    );
    res.status(201).send({ message: "User created successfully", success: true });
  } 
  catch (error) 
  {
    next(error);
  }
});


router.post("/Login", async (req, res, next) => 
{
  try 
  {
    // Check if user already logged in
    if (req.session.user_id != undefined)
      throw { status: 401, message: "User already logged in" };

    // Check that username exists
    const users = await DButils.execQuery("SELECT username FROM users");
    if (!users.find((x) => x.username === req.body.username))
      throw { status: 401, message: "Username or Password incorrect" };

    // Check that the password is correct
    const user = (await DButils.execQuery(`SELECT * FROM users WHERE username = '${req.body.username}'`))[0];
    if (!bcrypt.compareSync(req.body.password, user.password))
      throw { status: 401, message: "Username or Password incorrect" };

    // Set cookie
    req.session.user_id = user.user_id;

    // Return cookie
    res.status(200).send({ message: "Login succeeded", success: true });
  }
  catch (error) 
  {
    next(error);
  }
});

router.post("/Logout", function (req, res) 
{
  req.session.reset();  // reset the session info --> send cookie when req.session == undefined
  res.send({ success: true, message: "Logout succeeded" });
});

module.exports = router;