const accMod = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { budget, name } = req.body;
  console.log(isNaN(budget))
  if( budget === undefined || !name ) return next({message: 'name and budget are required', status: 400})
  if( isNaN(budget) || !parseInt(budget) ) return next({message: 'must be a number', status: 400})
  if( name.trim().length < 3 || name.trim().length > 100 ) return next({message: 'between 3 and 100', status: 400})
  if( !parseInt(budget) || isNaN(budget) ) return next({message: 'too large or too small', status: 400})
  if (Math.sign(budget) === -1 || budget > 1000000) return next({message: 'budget of account is too large or too small', status: 400})
  req.pl = {"budget": budget, "name": name.trim()};
  next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  let nam = await accMod.getByName(req.pl.name)
    if(nam) return next({message: 'name is taken', status: 400})
  next()
}

exports.checkAccountId = (req, res, next) => {
  accMod.getById(req.params.id)
    .then(pl => {
      if(!pl) return next({message: 'account not found', status: 404});
      return;
    })
    next()
}
