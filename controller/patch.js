import dbPatch from '../db/queries/patch.js';
import { validationResult, matchedData } from 'express-validator';

const updateStockQuantity = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(error.array().join(','));
  }

  const { id, quantity } = matchedData(req, { locations: ['body', 'params'] });
  
  try {
    await dbPatch.patchStockQuantity(id, quantity);
  } catch (err) {
    return next(err);
  }

  res.redirect('/stocks');
}

export default { updateStockQuantity };