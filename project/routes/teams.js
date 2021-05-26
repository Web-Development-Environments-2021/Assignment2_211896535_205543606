var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const coach_utils = require("./utils/coach_utils")

router.get("/teamFullDetails/:teamId", async (req, res, next) => {
  let team_details = [];
  try {
    // const team_details = await players_utils.getPlayersByTeam(
    //   req.params.teamId);
    const team_players = await players_utils.getPlayersByTeam(req.params.teamId);
    const team_coach = await coach_utils.getCoachIdByTeam(req.params.teamId);
    team_details.push(team_players);
    team_details.push(team_coach);
    //we should keep implementing team page.....
    //add matches
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
