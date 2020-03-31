const Router = require("koa-router");
const Material = require("../mysql/material");
const router = new Router();
const superagent = require("superagent");
const { StringDecoder } = require("string_decoder");

// 获取物品类型列表
router.get("/materialTags", async ctx => {
  let sqlData = await Material.queryMaterialTags();
  let data = [];
  for (let i = 0; i < sqlData.length; i++) {
    let obj = {
      name: sqlData[i].name,
      id: sqlData[i].id,
      tag: sqlData[i].header
    };
    data.push(obj);
  }
  ctx.body = {
    code: 1000,
    msg: "ok",
    data
  };
});

// 插入物品数量
router.get("/insertMaterial", async ctx => {
  // https://game.gtimg.cn/images/lol/act/img/js/items/items.js
  let d = await superagent.get(
    "https://game.gtimg.cn/images/lol/act/img/js/items/items.js"
  );
  let sd = new StringDecoder();
  d = JSON.parse(sd.write(d.body));
  let items = d.items;
  for (let i = 0; i < items.length; i++) {
    let obj = {
      materialId: items[i].itemId,
      name: items[i].name,
      iconPath: items[i].iconPath,
      price: items[i].price,
      description: items[i].description,
      maps: stringifyType(items[i].maps),
      plaintext: items[i].plaintext,
      sell: items[i].sell,
      total: items[i].total,
      sup: stringifyType(items[i].into),
      sub: stringifyType(items[i].from),
      suitHeroId: items[i].suitHeroId,
      tag: items[i].tag,
      types: stringifyType(items[i].types)
    };
    Material.insertMaterialData(obj).catch(err => {
      console.log(err);
    });
  }

  ctx.body = {
    code: 1000,
    data,
    msg: "ok"
  };
});

// 获取物品列表
router.get("/materialList", async ctx => {
  let sqlData = await Material.queryMaterialList();
  let data = [];
  for (let i = 0; i < sqlData.length; i++) {
    let obj = {
      id: sqlData[i].materialId,
      name: sqlData[i].name,
      iconPath: sqlData[i].iconPath
      // price: sqlData[i].price,
      // description: sqlData[i].description,
      // maps: parseType(sqlData[i].maps),
      // plaintext: sqlData[i].plaintext,
      // sell: sqlData[i].sell,
      // total: sqlData[i].total,
      // sup: parseType(sqlData[i].sup),
      // sub: parseType(sqlData[i].sub),
      // suitHeroId: sqlData[i].suitHeroId,
      // tag: sqlData[i].tag,
      // types: parseType(sqlData[i].types)
    };
    data.push(obj);
  }

  ctx.body = {
    code: 1000,
    data,
    msg: "ok"
  };
});

// 获取药品详情
router.get("/materialDetail", async ctx => {
  const { id } = ctx.query;
  let main = await Material.queryMaterialDatail(id);
  let data = {};
  if (main.length > 0) {
    main = main[0];
    data = {
      id: main.materialId,
      name: main.name,
      iconPath: main.iconPath,
      price: main.price,
      total: main.total,
      sell: main.sell,
      description: main.description,
      plaintext: main.plaintext,
      maps: parseType(main.maps),
      types: parseType(main.types),
      into: [],
      from: []
    };

    let into = parseType(main.sup);
    let from = parseType(main.sub);
    for (let i = 0; i < into.length; i++) {
      let intoData = await Material.queryMaterialDatail(into[i]);
      if (intoData.length > 0) {
        let item = {
          id: intoData[0].materialId,
          name: intoData[0].name,
          iconPath: intoData[0].iconPath
        };
        data.into.push(item);
      }
    }
    for (let i = 0; i < from.length; i++) {
      let fromData = await Material.queryMaterialDatail(from[i]);
      if (fromData.length > 0) {
        let item = {
          id: fromData[0].materialId,
          name: fromData[0].name,
          iconPath: fromData[0].iconPath
        };
        data.from.push(item);
      }
    }
  }

  ctx.body = {
    code: 1000,
    data,
    msg: "ok"
  };
});

// 判断类型
function stringifyType(data) {
  return typeof data === "object" ? data.join(",") : "";
}

// format
function parseType(data) {
  return data.indexOf(",") > -1 ? data.split(",") : data ? [data] : [];
}

module.exports = router;
