var express = require("express");
var router = express.Router();
const players_utils = require("./utils/players_utils");


/**
 * This path return all details about a player by  ID
 */
//WORKS GOOD
router.get("/:playerId", async (req, res, next) => {
  try {
    const player_details = await players_utils.getPlayerDetailsById(req.params.playerId);
    res.send(player_details);
  } catch (error) {
    next(error);
  }
});

/**
 * This path return preview details about a player by  ID
 */
//WORKS GOOD
router.get("/getPreview/:playerId", async (req, res, next) => {
  try {
    const player_preview = await players_utils.getPlayerPreviewById(req.params.playerId);
    res.send(player_preview);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
