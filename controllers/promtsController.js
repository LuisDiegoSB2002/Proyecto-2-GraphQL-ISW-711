const Promt = require("../models/modelGraphql.js");

const searchByName = async ({ user_id, name }) => {
  
  try {
    const prompts = await Promt.find({idUser: user_id, name: { $regex:name, $options: "i" },});
    return prompts;
  } catch (err) {
    throw new Error("Error al buscar por nombre."); 
  }
};

const searchByEtiqueta = async ({ user_id, etiquetas }) => {
  console.log("esto es: "+etiquetas);
  try {
    const prompts = await Promt.find({ idUser: user_id, etiquetas: { $in: etiquetas } });
    return prompts;
  } catch (err) {
    throw new Error("Error al buscar por Etiquetas");
  }
};
const getAll = async ({ user_id }) => {
  console.log("este es: "+user_id);
  try {
    const prompts = await Promt.find({ idUser: user_id });
    return prompts;
  } catch (err) {
    throw new Error("Error al buscar por usuario");
  }
};

module.exports = { searchByName, searchByEtiqueta,getAll};