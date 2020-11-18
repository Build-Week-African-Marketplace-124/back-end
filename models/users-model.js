const db = require('../data/config');

module.exports = {
  find,
  findBy,
  findById,
  findByUsername,
  add,
  update,
  remove,
};

function find() {
	return db("users as u")
		.innerJoin("roles as r", "r.id", "u.role_id")
		.select("u.id", "u.username", "r.name as role")
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users').where({ id }).first();
}

function findByUsername(username) {
	return db("users as u")
		.innerJoin("roles as r", "r.id", "u.role_id")
		.where("u.username", username)
		.first("u.id", "u.username", "u.password", "r.name as role")
}

async function add(user) {
  console.log("consol.log here")
	const [id] = await db("users").insert(user, "id")
	return findById(id)
}

async function update(id, changes) {
  await db('users').where({ id }).update(changes);
  return findById(id);
}

function remove(id) {
  
  return db('users').where({ id }).del();
}
