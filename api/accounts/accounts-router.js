const router = require('express').Router()
const accMod = require('./accounts-model')
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  accMod.getAll().then(accAll => {
    res.json(accAll);
  }).catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  accMod.getById(req.params.id)
    .then(obj => res.json(obj))
    .catch(next)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    let created = await accMod.create(req.pl)
    res.status(201).json(created)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  accMod.updateById(req.params.id, req.pl)
    .then(pl => res.json(pl))
    .catch(next);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
    accMod.deleteById(req.params.id)
      .then(() => res.send())
      .catch(next)
})

module.exports = router;
