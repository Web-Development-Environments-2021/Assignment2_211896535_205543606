var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcryptjs");
const referees_utils = require("./utils/referees_utils")

router.post("/addReferee", async (req, res, next) => {
  try {
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

// router.post("/Login", async (req, res, next) => {
//   try {
//     const user = (
//       await DButils.execQuery(
//         `SELECT * FROM dbo.Users WHERE username = '${req.body.username}'`
//       )
//     )[0];
//     // user = user[0];
//     console.log(user);

//     // check that username exists & the password is correct
//     if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
//       throw { status: 401, message: "Username or Password incorrect" };
//     }

//     // Set cookie
//     req.session.username = user.username;

//     // return cookie
//     res.status(200).send("login succeeded");
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/Logout", function (req, res) {
//   req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
//   res.send({ success: true, message: "logout succeeded" });
// });

// // --> For Displaying username/guest on NavBar
// router.get("/getUserId",(req,res) => {
//   if(req.session.username)
//     res.send(req.session.username);
//   else
//     res.send("guest")
//   });

module.exports = router;
