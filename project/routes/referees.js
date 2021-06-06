var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcryptjs");
const referees_utils = require("./utils/referees_utils")


/**
 * This path gets body with reffereID and name and save the it in referee table 
 */
//WORKS GOOD
router.post("/addReferee", async (req, res, next) => {
  try {
    //check if id already exist
    if(req.session.username!=="admin")
    throw { status: 401, message: "not admin, action not allowed" };
    const referees = await referees_utils.getReferees();
        if (referees && referees.find((x) => x.referee_id === req.body.referee_id))
            throw { status: 409, message: "referee_id taken" };

    // //hash the password
    // let hash_password = bcrypt.hashSync(
    //   req.body.password,
    //   parseInt(process.env.bcrypt_saltRounds)
    // );
    // req.body.password = hash_password;
    await referees_utils.addReferee(req.body.referee_id,req.body.fullname);
    res.status(201).send("referee created");
  } catch (error) {
    next(error);
  }
});



module.exports = router;
