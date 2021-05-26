var express = require("express");
var router = express.Router();
const player_utils = require("./utils/players_utils");

router.get("/players/:playerId", async (req, res, next) => {
  try {
    const player_details = await player_utils.getPlayerDetailsById(req.params.playerId);
    res.send(player_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
