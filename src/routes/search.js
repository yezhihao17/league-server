const Router = require("koa-router");
const router = new Router();
const Search = require("../mysql/search");

// 搜索列表类型（0：英雄；1：物品）
const SEARCH_TYPE = ["heros", "material"];

// 搜索接口
router.get("/search", async ctx => {
  let { value, type } = ctx.query;
  let table =
    type && typeof Number(type) === "number"
      ? SEARCH_TYPE[Number(type)]
      : SEARCH_TYPE[0];
  let data = [];
  if (value) {
    data = await Search.search(table, value);
  }

  // 从组新数组数据
  let newData = [];
  for (let i = 0; i < data.length; i++) {
    let item = {
      id: "",
      name: ""
    };
    item["id"] = table === SEARCH_TYPE[1] ? data[i].materialId : data[i].id;
    item["name"] = data[i].name;
    newData.push(item);
  }

  ctx.body = {
    code: 1000,
    data: {
      list: newData,
      total: data.length
    },
    msg: "ok"
  };
});

module.exports = router;
