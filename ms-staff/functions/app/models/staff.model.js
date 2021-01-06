const object_id = require('mongodb').ObjectId;
const utility = require('../../constant/utility-function');
module.exports.insert_staff_query = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({
        first_name: body.first_name,
        last_name: body.last_name,
        gender: body.gender,
        country_code: body.country_code,
        tel: body.tel,
        email: await utility.text_to_lowercase(body.email),
        username: await utility.text_to_lowercase(body.username),
        password: body.password,
        password_fail: body.password_fail,
        reg_date: new Date(body.reg_date),
        last_login_ip: body.last_login_ip,
        last_login_date: new Date(body.last_login_date),
        status: body.status,
        cr_by: 'Admin',
        cr_date: new Date(),
        cr_prog_id: await utility.text_to_uppercase('staff'),
        upd_by: 'Admin',
        upd_date: new Date(),
        upd_prog: await utility.text_to_uppercase('staff'),
        online_status: body.online_status,
      });
    } catch (e) {
      resolve(e);
    }
  });
};
module.exports.sign_in_staff_query = async (body) => {
  return new Promise((resolve, reject) => {
    try {
      resolve({
        $match: {
          $and: [
            {
              username: body.username,
            }
          ]
        }
      },
        {
          $project: {
            first_name: '$first_name',
            last_name: '$last_name',
            username: '$username',
            email: '$email',
            tel: '$tel'

          }
        });
    } catch (e) {
      resolve(e);
    }
  });
};
