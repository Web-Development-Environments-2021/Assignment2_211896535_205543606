var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");

router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    //should add future games of user from OUR DB
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
