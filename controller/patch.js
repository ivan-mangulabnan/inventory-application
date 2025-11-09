import dbPatch from '../db/queries/patch.js';
import { validationResult, matchedData } from 'express-validator';

const updateStockQuantity = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).send('Validation Error');
  }

  const { id, quantity } = matchedData(req, { locations: ['body', 'params'] });
  
  try {
    await dbPatch.patchStockQuantity(id, quantity);
  } catch (err) {
    throw new Error(err);
  }

  res.redirect('/stocks');
}

export default { updateStockQuantity };