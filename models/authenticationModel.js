import { db } from "../config/dbConfig.js";
import { execQuery } from "../utils/dbUtil.js";

export const loginMdl = function (signupdata, callback) {
  var QRY_TO_EXEC = `SELECT * FROM user where email= "${signupdata.userEmail}"`
  // console.log("QRY_TO_EXEC", QRY_TO_EXEC)
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        console.log()
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC);
  console.log("==========>", QRY_TO_EXEC)

};

export const createUserMdl = function (userData, callback) {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    address,
    mobileNo,
  } = userData;

  // Check if the email already exists
  const checkEmailQuery = `SELECT COUNT(*) AS emailCount FROM user WHERE email = "${email}"`;

  execQuery(db, checkEmailQuery, function (err, results) {
    if (err) {
      // Handle the error
      if (callback && typeof callback === "function") {
        callback(err, null);
      } else {
        return err;
      }
    } else {
      const emailCount = results[0].emailCount;

      // Check if the username already exists
      const checkUsernameQuery = `SELECT COUNT(*) AS usernameCount FROM user WHERE user_name = "${userName}"`;

      execQuery(db, checkUsernameQuery, function (err, results) {
        if (err) {
          // Handle the error
          if (callback && typeof callback === "function") {
            callback(err, null);
          } else {
            return err;
          }
        } else {
          const usernameCount = results[0].usernameCount;

          if (emailCount > 0) {
            // Email already exists, return an error
            const emailExistsError = new Error("Email already exists");
            if (callback && typeof callback === "function") {
              callback(emailExistsError, null);
            } else {
              return emailExistsError;
            }
          } else if (usernameCount > 0) {
            // Username already exists, return an error
            const usernameExistsError = new Error("Username already exists");
            if (callback && typeof callback === "function") {
              callback(usernameExistsError, null);
            } else {
              return usernameExistsError;
            }
          } else {
            // Insert the new user since neither email nor username exists
            const insertUserQuery = `INSERT INTO user (user_name, first_name, last_name, email, password, mobile_no, address) VALUES ("${userName}", "${firstName}", "${lastName}", "${email}", "${password}", "${mobileNo}", "${address}")`;

            execQuery(db, insertUserQuery, function (err, results) {
              if (callback && typeof callback === "function") {
                callback(err, results);
              } else {
                return err || results;
              }
            });
          }
        }
      });
    }
  });
};

