import { matchedData, validationResult } from "express-validator";
import dbDelete from '../db/queries/delete.js';

async function deleteProduct (req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(error.array().join(','));
  }

  const { id } = matchedData(req, { locations: ['params'] });

  try {
    await dbDelete.deleteProduct(id);
  } catch (err) {
    return next(err);
  }

  res.redirect('/products');
}

async function deleteStock (req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(error.array().join(','));
  }

  const { id } = matchedData(req, { locations: ['params'] });

  try {
    await dbDelete.deleteStock(id);
  } catch (err) {
    return next(err);
  }

  res.redirect('/stocks');
}

async function deleteCategory (req, res, next) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(error.array().join(','));
  }

  const { id } = matchedData(req, { locations: ['params'] });

  try {
    await dbDelete.deleteCategory(id);
  } catch (err) {
    return next(err);
  }

  res.redirect('/categories');
}

export default { deleteProduct, deleteStock, deleteCategory };