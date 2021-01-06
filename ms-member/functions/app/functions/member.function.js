const utility_model = require('../models/utility.model');
const model = require('../models/member.model');
const db_con = require('../../config/db-con');
const status_code = require('../../constant/http-status-codes');
const utility = require('../../constant/utility-function');
module.exports.sign_up_member = (request) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (request.headers.authorization) {
        const payload = await utility.decode_tokens(request.headers.authorization.substring(7)).catch((e) => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            statusCode: status_code.client_errors.token_expire.code,
            statusText: status_code.client_errors.token_expire.description,
          });
        });
        request.body.password = await utility.hash_password(request.body.password).catch((e) => {
          // eslint-disable-next-line no-throw-literal
          throw 'hash password error';
        });
        let query = await model.insert_member_query(request.body, payload).catch((e) => {
          // eslint-disable-next-line no-throw-literal
          throw 'generate query error';
        });
        let result = await utility_model.insert_one(db_con.TABLE_NAME.MEMBER, query, {}).catch((e) => {
          throw e;
        });
        if (result.insertedId) {
          resolve({
            statusCode: status_code.member.member_insert_success.code,
            statusText: status_code.member.member_insert_success.description,
          });
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            statusCode: status_code.member.member_insert_fail.code,
            statusText: status_code.member.member_insert_fail.description,
          });
        }
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          statusCode: status_code.client_errors.unauthorized.code,
          statusText: status_code.client_errors.unauthorized.description,
        });
      }
    } catch (e) {
      console.error(e);
      if (e.code === 11000) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          statusCode: status_code.member.member_duplicate.code,
          statusText: status_code.member.member_duplicate.description,
        });
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          statusCode: status_code.member.member_insert_fail.code,
          statusText: JSON.stringify(e, null, '\t'),
        });
      }
    }
  });
};
module.exports.sign_in_member = (request) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (request.body.username && request.body.password) {
        let query = await model.sign_in_member_query(request.body).catch((e) => {
          // eslint-disable-next-line no-throw-literal
          throw 'generate query error';
        });
        let result = await utility_model.aggregate(db_con.TABLE_NAME.MEMBER, query, {}).catch((e) => {
          // eslint-disable-next-line no-throw-literal
          throw e;
        });
        if (result.length) {
          await utility.decode_password(result[0].password, request.body.password).catch((e) => {
            throw e;
          });
          resolve({
            statusCode: status_code.member.member_sign_in_success.code,
            statusText: status_code.member.member_sign_in_success.description,
            accessToken: await utility.generated_tokens(result[0]),
          });
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            statusCode: status_code.member.member_sign_in_fail.code,
            statusText: status_code.member.member_sign_in_fail.description,
          });
        }
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          statusCode: status_code.client_errors.no_content.code,
          statusText: status_code.client_errors.no_content.description,
        });
      }
    } catch (e) {
      console.error(e);
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        statusCode: status_code.member.member_sign_in_fail.code,
        statusText: JSON.stringify(e, null, '\t'),
      });
    }
  });
};
