const controller = require('../controllers/member.controller');
module.exports = (app) => {
  app.post('/sign_up_member', controller.sign_up_member);
  app.post('/sign_in_member', controller.sign_in_member);
};
