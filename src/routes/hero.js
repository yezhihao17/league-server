const Router = require("koa-router");
const Hero = require("../mysql/hero/list");
const superagent = require("superagent");
const { StringDecoder } = require("string_decoder");
const fs = require("fs");
const path = require("path");
const router = new Router();

// 英雄列表
router.get("/heroList", async ctx => {
  // Hero.createTable()

  // // id, nickName, name, alias, role, introduction
  // let params = {
  //   id: 1,
  //   nickName: "安妮",
  //   name: "黑暗之女",
  //   alias: "Annie",
  //   role: "mage",
  //   introduction: "既拥有危险夺命的能力，又拥有小大人儿的可爱模样，安妮是一名掌握着深不可测的占火魔法的幼女魔法师。安妮生活在诺克萨斯北边的山脚下，即使是在这种地方，她也仍然是魔法师中的异类。她与火焰的紧密关系与生俱来，最初是伴随着喜怒无常的情绪冲动出现的，不过后来她学会了如何掌握这些“好玩的小把戏”。其中她最喜欢的就是召唤她亲爱的泰迪熊提伯斯——一头狂野的守护兽。安妮已经迷失在了永恒的天真里。她在黑暗的森林中游荡，始终寻觅着能陪自己玩耍的人。"
  // }
  // Hero.insertHeroData(params)

  // 查询
  let d = await Hero.queryHeroList();

  let data = {
    code: 1000,
    msg: "ok",
    data: d
  };
  ctx.body = data;
});

// 获取英雄详情数据
router.get("/hero", async ctx => {
  // console.log(ctx.query);
  try {
    let { id } = ctx.query;
    // let d = await superagent.get(
    //   `https://game.gtimg.cn/images/lol/act/img/js/hero/${id}.js`
    // );
    // let sd = new StringDecoder();
    // d = sd.write(d.body);

    // // 写入json文件中
    // let data = JSON.parse(d)
    // writeFile(id, JSON.stringify(data, null, "\t"));

    let d = await readFile(id);
    d = JSON.parse(d);

    // insertData(id, d);

    ctx.body = {
      code: 1000,
      msg: "ok",
      data: d
    };
  } catch (e) {
    console.log(e);
    ctx.body = {
      code: 1005,
      msg: "not found!",
      data: null
    };
  }
});

// 获取皮肤数据
router.get("/skin", async ctx => {
  const { id } = ctx.query;
  let d = await readFile(id);
  d = JSON.parse(d);
  // await Hero.createSkinTables();
  
  ctx.body = {
    code: 1000,
    msg: "ok",
    data: d
  }
});

// 写入文件
function writeFile(name, data) {
  fs.writeFile(
    path.join(__dirname, `../mysql/json/${name}.json`),
    data,
    err => {
      if (err) throw err;
      console.log("文件保存成功！");
    }
  );
}

// 读取文件
function readFile(name) {
  return new Promise((res, rej) => {
    let p = `../mysql/json/${name}.json`;
    fs.readFile(path.join(__dirname, p), "utf8", (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}

// 将读取的数据插入到数据库中
async function insertData(id, data) {
  // id, nickName, name, alias, role, introduction, cover
  let { hero, skins } = data;
  let params = {
    id: id,
    nickName: hero.title,
    name: hero.name,
    alias: hero.alias,
    roles: hero.roles.join(","),
    description: hero.shortBio,
    cover: skins[0].mainImg
  };
  let d = await Hero.queryHeroData(id);
  if (d.length === 0) {
    Hero.insertHeroData(params);
  }
  // console.log(d);
  // Hero.insertHeroData(params);
}

module.exports = router;
