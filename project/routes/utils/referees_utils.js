const DButils = require("./DButils");

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


async function checkIfRefereeExist(referee_id) {
  const referee = await DButils.execQuery(
    `select * from Referees where referee_id ='${referee_id}'`
  );
  if (referee && referee.length>0) return true;
  else return false;
}
exports.checkIfRefereeExist = checkIfRefereeExist;
exports.addReferee = addReferee;
exports.getReferees = getReferees;
