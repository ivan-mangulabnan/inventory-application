import dbPut from '../db/queries/put.js';
import { validationResult, matchedData } from 'express-validator';

async function putEditedProduct (req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new Error(error.array().join(','));
  }

  const { id, name, category, price } = matchedData(req, { locations: ['body', 'params'] });

  try {
    await dbPut.putEditedProduct(id, name, price, category);
  } catch (err) {
    throw new Error(err);
  }

  res.redirect('/products');
}

export default { putEditedProduct };