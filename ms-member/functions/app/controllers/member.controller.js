const fnc = require('../functions/member.function');
module.exports.sign_up_member = async (request, response) => {
  try {
    let result = await fnc.sign_up_member(request);
    response.send(result);
  } catch (e) {
    response.send(e);
  }
};
module.exports.sign_in_member = async (request, response) => {
  try {
    let result = await fnc.sign_in_member(request);
    response.send(result);
  } catch (e) {
    response.send(e);
  }
};
