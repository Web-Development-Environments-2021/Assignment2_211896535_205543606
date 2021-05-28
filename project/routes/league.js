var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
const matches_utils = require("./utils/matches_utils")

router.get("/getDetails", async (req, res, next) => {
  try {
    let full_details = [];
    const league_details = await league_utils.getLeagueDetails();
    //should add future games of user from OUR DB
    const today = new Date();
    console.log(today);
    console.log(today.getDate());
    const closet_match = await matches_utils.getClosetMatch(today);
    full_details.push(league_details);
    full_details.push(closet_match);
    res.send(full_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
