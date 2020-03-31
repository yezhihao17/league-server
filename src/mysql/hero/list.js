/**
 * 英雄相关
 */
const query = require("../sql");

// 创建表
let hero = {
  // 创建表（英雄列表）
  createTable: () => {
    return query(`
      create table heros
      (
        id int(11),
        nickName varchar(30),
        name varchar(30),
        alias varchar(45),
        roles varchar(255),
        description varchar(255),
        cover varchar(255)
      );
    `);
  },

  // 创建（皮肤数据表）
  createSkinTables: () => {
    return query(`
      create table skins
      (
        skinId varchar(11),
        heroId varchar(11),
        heroName varchar(45),
        heroTitle varchar(45),
        name varchar(45),
        chromas varchar(11),
        chromasBelongId varchar(11),
        isBase varchar(11),
        emblemsName varchar(11),
        description TEXT,
        mainImg varchar(255),
        iconImg varchar(255),
        loadingImg varchar(255),
        videoImg varchar(255),
        sourceImg varchar(255),
        vedioPath varchar(255),
        suitType varchar(255),
        publishTime varchar(255),
        chromaImg varchar(255)
      );
    `);
  },

  // 插入皮肤数据
  insertSkinData: data => {
    // const {
    //   skinId,
    //   heroId,
    //   heroName,
    //   heroTitle,
    //   name,
    //   chromas,
    //   chromasBelongId,
    //   isBase,
    //   emblemsName,
    //   description,
    //   mainImg,
    //   iconImg,
    //   loadingImg,
    //   videoImg,
    //   sourceImg,
    //   vedioPath,
    //   suitType,
    //   publishTime,
    //   chromaImg
    // } = data;
    // let sql = `
    //   insert into skins
    //   (skinId, heroId, heroName, heroTitle, name, chromas, chromasBelongId, isBase, emblemsName, description, mainImg, iconImg, loadingImg, videoImg, sourceImg, vedioPath, suitType, publishTime, chromaImg)
    //   VALUES(
    //     "${skinId}"
    //   )
    // `;
  },

  // 插入数据
  insertHeroData: data => {
    const { id, nickName, name, alias, roles, description, cover } = data;
    let sql = `
      insert into heros
      (id, nickName, name, alias, roles, description, cover)
      values
      (${id}, "${nickName}", "${name}", "${alias}", "${roles}", "${description}", "${cover}");
    `;
    return query(sql);
  },

  // 查询数据
  queryHeroData: id => {
    let sql = `
      select * from heros where id=${id}
    `;
    return query(sql);
  },

  // 查询列表
  queryHeroList: () => {
    let sql = `
      select * from heros;
    `;
    return query(sql);
  }
};

module.exports = hero;
