const controller = require('../controllers/staff.controller');
module.exports = (app) => {
  app.post('/insert_staff', controller.insert_staff);
  app.post('/sign_in_staff', controller.sign_in_staff);
};
