const DButils = require("./DButils");

//----->ADD REFEREES<------//
async function addReferee(referee_id,fullname) {
  await DButils.execQuery(
    `insert into Referees values ('${referee_id}','${fullname}')`
  );
}
async function getReferees() {
    await DButils.execQuery(
        "SELECT referee_id FROM dbo.Referees"
    );
  }

exports.addReferee = addReferee;
exports.getReferees = getReferees;
