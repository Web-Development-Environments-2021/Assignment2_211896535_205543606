var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
const matches_utils = require("./utils/matches_utils")

/**
 * This path return all details about league
 */
router.get("/getDetails", async (req, res, next) => {
  try {
    let full_details = [];
    const league_details = await league_utils.getLeagueDetails();
    //should add future games of user from OUR DB
    const today = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const closest_match = await matches_utils.getClosestMatch(today);
    console.log(closest_match);
    full_details.push(league_details);
    if (closest_match.length!=null){
      const closest_match_preview = await matches_utils.getMatchPreviewById(closest_match[0].match_id);
      full_details.push(closest_match_preview);
    }
    res.send(full_details);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
