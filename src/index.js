const Koa = require("koa");
const app = new Koa();
const hero = require("./routes/hero");
const material = require("./routes/material");
const search = require("./routes/search");

// 使用路由
app.use(hero.routes(), hero.allowedMethods());
app.use(material.routes(), material.allowedMethods());
app.use(search.routes(), search.allowedMethods());

app.listen(9999, () => {
  console.log("服务器启动成功");
});
