const db = require("../helpers/db");

module.exports = {
  addChampionDetails,
  getChampionDetails,
  getChampionDetailsByChampion_index,
};

async function addChampionDetails(data) {
  //console.log(data);

  const userExist = await db.UserDetails.findOne({
    where: { user_id: data.user_id },
  });
  if (!userExist) {
    throw "User Does not exist";
  }
const user=await db.ChampionDetails.findOne({where:{user_id:data.user_id,champion_index:data.champion_index,champion_changes_number:data.champion_changes_number}})
  if (user) {
    user.champion_name = data.champion_name;
      user.champion_price = data.champion_price;
      user.champion_purchased = data.champion_purchased;
      user.select_gender = data.select_gender;
      user.current_skintone = data.current_skintone;
      await user.save();

    const bodytypes = data.bodytype;
    bodytypes.forEach((element) => {
        element.champion_id = user.champion_id;
      });
      await db.bodyTypes.destroy({where:{champion_id:user.champion_id}});
    const createbodytype = await db.bodyTypes.bulkCreate(bodytypes);
    return "Champion Updated Successfully"
}

  const champData = new db.ChampionDetails({
    champion_index: data.champion_index,
    champion_changes_number: data.champion_changes_number,
    champion_name: data.champion_name,
    champion_price: data.champion_price,
    champion_purchased: data.champion_purchased,
    select_gender: data.select_gender,
    current_skintone: data.current_skintone,
    user_id: data.user_id,
  });

  const champDetail = await champData.save();
  //return champDetail;

  const bodytype = data.bodytype;
  bodytype.forEach((element) => {
    element.champion_id = champDetail.champion_id;
  });

  const createbodytype = await db.bodyTypes.bulkCreate(bodytype);
  //console.log(createbodytype);
  //return createbodytype;
  return "Champion Added Successfully"
}

async function getChampionDetails(data) {
  const userExist = await db.UserDetails.findOne({
    where: { user_id: data.user_id },
  });
  if (!userExist) {
    throw "User Does not exist";
  }

  const championData = await db.ChampionDetails.findAll({
    where: { user_id: data.user_id },
    attributes: { exclude: [ "champion_id"] },
    include: {
      association: "bodytype",
      attributes: { exclude: ["id", "champion_id"] },
    },
  });
  return championData;
}


async function getChampionDetailsByChampion_index(data) {
  const userExist = await db.UserDetails.findOne({
    where: { user_id: data.user_id },
  });
  if (!userExist) {
    throw "User Does not exist";
  }

  const championData = await db.ChampionDetails.findAll({
    where: {
      user_id: data.user_id,
      champion_index: data.champion_index,
    },
    attributes: { exclude: [ "champion_id"] },
    include: {
      association: "bodytype",
      attributes: { exclude: ["id", "champion_id"] },
    },
  });
  return championData;
}
