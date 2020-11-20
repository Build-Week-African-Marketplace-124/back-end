const db = require('../data/config');


module.exports = {
  getUserById,
  findBy,
  addNewUser,
  editUser,
  deleteUser,
  getAllUsers,
};

function getAllUsers() {
  return db("users").orderBy("users.id", "asc");
}


function getUserById(id) {
  return db("users").where({ id }).first();
}


function findBy(filter) {
  return db("users").where(filter);
}


async function addNewUser(user) {
  const [id] = await db("users").insert(user, "id");
  return getUserById(id);
}


async function editUser(id, changes) {
  await db("users").where({ id }).update(changes);
  return getUserById(id);
}


function deleteUser(id) {
  return db("users").where({ id }).del();
}
