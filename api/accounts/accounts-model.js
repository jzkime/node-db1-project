const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts')
    .where('id', id)
    .first();
}

const create = account => {
  return db('accounts')
    .insert(account)
    .then(arrId => getById(arrId[0]))
}

const updateById = (id, account) => {
  return db('accounts')
    .where('id', id)
    .update(account)
    .then(rowsAff => {
      if(rowsAff === 0) 
        return null;
      return getById(id);
    })
}

const deleteById = id => {
  return db('accounts')
    .where('id', id)
    .delete()
}

const getByName = name => {
  return db('accounts')
    .select('name')
    .where({name: name})
    .first()
    .then(pl => pl)
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName
}
