const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('./jwt-conn');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
module.exports = {
  generated_tokens: (data) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(jwt.sign(data, secret, { expiresIn: expiresIn }));
      } catch (error) {
        reject(error);
      }
    });
  },
  decode_tokens: (data) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(jwt.verify(data, secret));
      } catch (error) {
        reject(error);
      }
    });
  },
  is_null: (param) => {
    if (param === false || param === null || param === undefined || param.length <= 0) {
      return true;
    } else {
      if (!Object.keys(param).length) {
        return true;
      }
      return false;
    }
  },
  check_null: (param) => {
    // eslint-disable-next-line valid-typeof
    if (param !== '' && typeof param !== 'undefined' && typeof param !== null) {
      return true;
    } else {
      return false;
    }
  },
  randomTracking: (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  hash_password: (password) => {
    return new Promise((resolve, reject) => {
      try {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            throw err
          } else {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                throw err
              } else {
                console.log(hash)
                resolve(hash);
              }
            })
          }
        })

      } catch (error) {
        reject(error);
      }
    });
  },
  decode_password: (hash, password) => {
    return new Promise((resolve, reject) => {
      try {
        bcrypt.compare(password, hash, (err, isMatch) => {
          if (err) {
            throw err
          } else if (!isMatch) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(`Password doesn't match!`)
          } else {
            resolve(true)
          }
        })

      } catch (error) {
        reject(error);
      }
    });
  },
  text_to_lowercase: (data) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(data.toLowerCase());
      } catch (error) {
        reject(error);
      }
    });
  },
  text_to_uppercase: (data) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(data.toUpperCase());
      } catch (error) {
        reject(error);
      }
    });
  },
};
