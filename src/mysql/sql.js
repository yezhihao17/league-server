const database = require("./index");

let query = function(sql) {
  return new Promise((resolve, reject) => {
    database.query(sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = query;
