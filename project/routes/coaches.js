var express = require("express");
var router = express.Router();
const coach_utils = require("./utils/coach_utils");

router.get("/:coachId", async (req, res, next) => {
  try {
    const coach_details = await coach_utils.getCoachDetailsById(req.params.coachId);
    res.send(coach_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
