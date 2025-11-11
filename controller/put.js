import dbPut from '../db/queries/put.js';
import { validationResult, matchedData } from 'express-validator';

async function putEditedProduct (req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(error.array().join(','));
  }

  const { id, name, category, price } = matchedData(req, { locations: ['body', 'params'] });

  try {
    await dbPut.putEditedProduct(id, name, price, category);
  } catch (err) {
    return next(err);
  }

  res.redirect('/products');
}

async function putEditedCategory (req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(error.array().join(','));
  }

  const { id, name } = matchedData(req, { locations: ['body', 'params'] });

  try {
    await dbPut.putEditedCategory(id, name);
  } catch (err) {
    return next(err);
  }

  res.redirect('/categories');
}

export default { putEditedProduct, putEditedCategory };