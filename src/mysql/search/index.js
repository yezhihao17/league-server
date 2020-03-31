const query = require("../sql");

let search = {
  // 查找信息
  search: (table, val) => {
    let condition =
      table === "material"
        ? `name LIKE "%${val}%"`
        : `name LIKE "%${val}%" || nickName LIKE "%${val}%"`;
    let sql = `
      SELECT * FROM ${table} WHERE ${condition};
    `;
    return query(sql);
  }
};

module.exports = search;
