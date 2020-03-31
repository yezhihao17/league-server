/**
 * 物品相关
 */
const query = require("../sql");

let material = {
  // 获取物品类型列表
  queryMaterialTags: () => {
    let sql = `
      SELECT * FROM material_tree;
    `;
    return query(sql);
  },

  // 插入物品数据
  insertMaterialData: data => {
    const {
      materialId,
      name,
      iconPath,
      price,
      description,
      maps,
      plaintext,
      sell,
      total,
      sup,
      sub,
      suitHeroId,
      tag,
      types
    } = data;
    // let sql = `
    //   INSERT INTO material
    //   (materialId, name, iconPath, price, description, maps, plaintext, sell, total, into, from, suitHeroId, tag, types)
    //   VALUES("${materialId}", "${name}", "${iconPath}", "${price}", "${description}", "${maps}", "${plaintext}", "${sell}", "${total}", "${into}", "${from}", "${suitHeroId}", "${tag}", "${types}");
    // `;
    let sql = `
      INSERT INTO material
      (materialId, name, iconPath, price, description, maps, plaintext, sell, total, sup, sub, suitHeroId, tag, types)
      VALUES('${materialId}', '${name}', '${iconPath}', '${price}', '${description}', '${maps}', '${plaintext}', '${sell}', '${total}', '${sup}', '${sub}', '${suitHeroId}', '${tag}', '${types}');
    `;
    return query(sql);
  },

  // 获取物品列表数据
  queryMaterialList: () => {
    let sql = `
      SELECT * FROM material LIMIT 50;
    `;
    return query(sql);
  },

  // 获取物品详情数据
  queryMaterialDatail: id => {
    let sql = `
      SELECT * FROM material WHERE materialId=${id}
    `;
    return query(sql);
  }
};

module.exports = material;
