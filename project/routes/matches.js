const e = require("express");
var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const matches_utils = require("./utils/matches_utils");

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

//---->add Match<----//

router.post("/addMatch", async (req, res, next) => {
  try {
    const matches = await matches_utils.getMatches();
        if (matches && matches.find((x) => x.match_id === req.body.match_id))
            throw { status: 409, message: "match_id taken" };

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

//---->add Result<----//

router.post("/addResult", async (req, res, next) => {
  try {
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


module.exports = router;

