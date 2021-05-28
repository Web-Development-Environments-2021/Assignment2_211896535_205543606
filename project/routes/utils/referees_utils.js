const DButils = require("./DButils");

//----->ADD REFEREES<------//
async function addReferee(referee_id,fullname) {
  await DButils.execQuery(
    `insert into Referees values ('${referee_id}','${fullname}')`
  );
}
async function getReferees() {
    const referees = await DButils.execQuery(
        `SELECT referee_id FROM Referees`
    );
    return referees;
  }

exports.addReferee = addReferee;
exports.getReferees = getReferees;
