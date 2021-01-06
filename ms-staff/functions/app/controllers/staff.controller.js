const fnc = require('../functions/staff.function');
module.exports.insert_staff = async (request, response) => {
  try {
    let result = await fnc.insert_staff(request);
    response.send(result);
  } catch (e) {
    response.send(e);
  }
};
module.exports.sign_in_staff = async (request, response) => {
  try {
    let result = await fnc.sign_in_staff(request);
    response.send(result);
  } catch (e) {
    response.send(e);
  }
};
