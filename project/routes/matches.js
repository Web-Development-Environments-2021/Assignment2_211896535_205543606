const e = require("express");
var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const matches_utils = require("./utils/matches_utils");
const referees_utils = require("./utils/referees_utils");
const axios = require("axios");

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
 * This path add a match to MATCHES table by body params
 */
//WORKS GOOD
router.post("/addMatch", async (req, res, next) => {
  try {

    //check if matchID already exist
    const matches = await matches_utils.getMatches();
        if (matches && matches.find((x) => x.match_id === req.body.match_id))
            throw { status: 409, message: "match_id taken" };

    const referee_exist = await referees_utils.checkIfRefereeExist(req.body.match_referee);
    if (!referee_exist)
      throw { status: 409, message: "add a non existing referee to match its impossible" };
    
    if (req.body.home_team ===req.body.away_team)
      throw { status: 409, message: "team cannot play against herself" };
    const match_id = req.body.match_id;
    const match_date = req.body.match_date;
    const match_hour = req.body.match_hour;
    const home_team = req.body.home_team;
    const away_team = req.body.away_team;
    const match_referee = req.body.match_referee;
    const match_stadium = req.body.match_stadium;
    await matches_utils.addMatch(match_id,match_date,match_hour,home_team,away_team,match_referee,match_stadium);
    res.status(201).send("The Match successfully added");
  } catch (error) {
    next(error);
  }
});

/**
 * This path add a result to a match by body params
 */
//WORKS GOOD
router.post("/addResult", async (req, res, next) => {
  try {
    const match_exist = await matches_utils.checkIfMatchExist(req.body.match_id);
    console.log(match_exist);
    if (!match_exist)
      throw { status: 409, message: "add result to a non existing match its impossible" };
    const result = await matches_utils.getResultById(req.body.match_id);
        if (result[0].result==null){
          await matches_utils.addResult(req.body.match_id,req.body.match_result);
          res.status(201).send("result successfully updateded");
        }
        else{
          throw { status: 409, message: "match already has a result" };
        } 
  } catch (error) {
    next(error);
  }
});

/**
 * This path add a event calendar to a match by body params
 */
// should implement!!!!
router.post("/addEventCalendar", async (req, res, next) => {
  try {
    none
  } catch (error) {
    next(error);
  }
});

/**
 * This path return all the games in the system
 */
//WORKS GOOD
router.get("/getAllMatches", async (req, res, next) => {
  try {
    const matches = await matches_utils.getAllMatches();
    res.send(matches);
  } catch (error) {
    next(error);
  }
});

/**
 * This path return all the games in the system sort by date
 */
//WORKS GOOD
router.get("/getAllMatchesSortByDate", async (req, res, next) => {
  try {
    const matches = await matches_utils.getAllMatchesSortByDate();
    res.send(matches);
  } catch (error) {
    next(error);
  }
});

/**
 * This path return all the games in the system sort by team
 */
//WORKS GOOD
router.get("/getAllMatchesSortByTeam", async (req, res, next) => {
  try {
    const matches = await matches_utils.getAllMatchesSortByTeam();
    res.send(matches);
  } catch (error) {
    next(error);
  }
});

/**
 * This path return all the  past games
 */
//WORKS GOOD
router.get("/getPastMatches", async (req, res, next) => {
  try {
    const matches = await matches_utils.getPastGames();
    res.send(matches);
  } catch (error) {
    next(error);
  }
});
/**
 * This path return all the  future games
 */
//WORKS GOOD
router.get("/getFutureMatches", async (req, res, next) => {
  try {
    const matches = await matches_utils.getFutureGames();
    res.send(matches);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

