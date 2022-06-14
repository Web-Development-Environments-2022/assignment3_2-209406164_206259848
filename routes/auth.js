/**
 * This class is responsible for handeling all the user logic.
 * The class handles the register, login and logout actions.
 */

var express = require("express");
var router = express.Router();
const MySql = require("../routes/utils/MySql");
const DButils = require("../routes/utils/DButils");
const auth_utils = require("./utils/auth_utils");
const bcrypt = require("bcrypt");

router.post("/Register", async (req, res, next) => 
{
  try 
  {
    // Check if user already logged in
    if (req.session.user_id != undefined)
      res.status(401).send({ message: "The user is already logged in", success: false });

    const {username, firstname, lastname, country, password, email } = req.body

    // Check if parameters exists
    if (!username || !firstname || !lastname || !country || !password || !email) 
      res.status(401).send({ message: "One or more details are missing", success: false });
    
    // Check if username already exists
    let users = [];
    users = await DButils.execQuery("SELECT username from users");

    if (users.find((x) => x.username === username))
      res.status(401).send({ message: "Username already exists", success: false });

    // Add the new username
    let hash_password = bcrypt.hashSync(password, parseInt(process.env.bcrypt_saltRounds));
    await auth_utils.register(username, firstname, lastname, country, hash_password, email);
    res.status(200).send({ message: "User created successfully", success: true });
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
      res.status(401).send({ message: "The user is already logged in", success: false });

    const {username, password } = req.body;

    // Check if parameters exists
    if (!username || !password)
      res.status(401).send({ message: "One or more details are missing", success: false });

    // Check that username exists
    const users = await DButils.execQuery("SELECT username FROM users");
    if (!users.find((x) => x.username === req.body.username))
      res.status(401).send({ message: "Username or Password is incorrect", success: false });

    // Check that the password is correct
    const user = (await auth_utils.getUser(username))[0];
    if (!bcrypt.compareSync(password, user.password))
      res.status(401).send({ message: "Username or Password is incorrect", success: false });

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
  // Check if user is logged in
  if (req.session.user_id == undefined)
    res.status(401).send({ message: "The user is already logged out", success: false });

  // Reset the session info --> send cookie when req.session == undefined
  req.session.reset();
  res.status(200).send({ message: "Logout succeeded", success: true });
});

module.exports = router;