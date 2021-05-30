var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils");
const players_utils = require("./utils/players_utils");
const matches_utils = require("./utils/matches_utils");
const teams_utils = require("./utils/teams_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.username) {
    DButils.execQuery("SELECT username FROM dbo.Users")
      .then((users) => {
        if (users.find((x) => x.username === req.session.username)) {
          req.username = req.session.username;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});
/**
 * This path gets body with playerId and save this player in the favorites list of the logged-in user
 */
//WORKS GOOD
router.post("/favoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const player_id = req.body.playerId;
    if(!await players_utils.checkIfPlayerExist(player_id))
      throw { status: 403, message: "player_id not exist" };

    const player_ids = await users_utils.getFavoritePlayers(user_id);
    if (player_ids && player_ids.find((x) => parseInt(x.player_id) === parseInt(player_id)))
            throw { status: 409, message: "player_id already exist" };

    await users_utils.markPlayerAsFavorite(user_id, player_id);
    res.status(201).send("The player successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites players that were saved by the logged-in user
 */
//WORKS GOOD
router.get("/favoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    let favorite_players = {};
    const player_ids = await users_utils.getFavoritePlayers(user_id);
    let player_ids_array = [];
    player_ids.map((element) => player_ids_array.push(element.player_id)); //extracting the players ids into array
    const results = await players_utils.getPlayersInfo(player_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

/**
 * This path gets body with matchID and save this match in the favorites list of the logged-in user
 */
//WORKS GOOD
 router.post("/favoriteMatches", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const match_id = req.body.matchId;

    const all_matches = await matches_utils.getAllMatches();
    if (all_matches && all_matches.find((x) => parseInt(x.match_id) === parseInt(match_id))){
      let nothing = true;
    }
    else  throw { status: 409, message: "match_id not exist" };

    const match_ids = await users_utils.getFavoriteMatches(user_id);
    if (match_ids && match_ids.find((x) => parseInt(x.match_id) === parseInt(match_id)))
            throw { status: 409, message: "macth_id already exist" };

    
    console.log("ben");
    await users_utils.markMatchAsFavorite(user_id, match_id);
    res.status(201).send("The match successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites matches that were saved by the logged-in user
 */
//WORKS GOOD
router.get("/favoriteMatches", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    let favorite_plfavorite_matchesayers = {};
    const match_ids = await users_utils.getFavoriteMatches(user_id);
    let match_ids_array = [];
    match_ids.map((element) => match_ids_array.push(element.match_id)); //extracting the matches ids into array
    const results = await matches_utils.getMatchesInfo(match_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns up to 3 favorites matches that were saved by the logged-in user
 */
//WORKS GOOD
router.get("/UpTo3favoriteMatches", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    let favorite_matches = {};
    const match_ids = await users_utils.getUpTo3favoriteMatches(user_id);
    let match_ids_array = [];
    match_ids.map((element) => match_ids_array.push(element.match_id)); //extracting the matches ids into array
    const results = await matches_utils.getMatchesInfo(match_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

/**
 * This path gets body with teamID and save this Team in the favorites list of the logged-in user
 */
//WORKS GOOD
 router.post("/favoriteTeams", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const team_id = req.body.teamId;
    
    if(!await teams_utils.checkIfTeamExist(team_id))
      throw { status: 403, message: "team_id not exist" };

    const team_ids = await users_utils.getFavoriteTeams(user_id);
    if (team_ids && team_ids.find((x) => parseInt(x.team_id) === parseInt(team_id)))
            throw { status: 409, message: "team_id already exist" };

    await users_utils.markTeamAsFavorite(user_id, team_id);
    res.status(201).send("The Team successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites teams that were saved by the logged-in user
 */
//WORKS GOOD
router.get("/favoriteTeams", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    let favorite_teams = {};
    const team_ids = await users_utils.getFavoriteTeams(user_id);
    let team_ids_array = [];
    team_ids.map((element) => team_ids_array.push(element.team_id)); //extracting the matches ids into array
    const results = await teams_utils.getTeamsInfo(team_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
