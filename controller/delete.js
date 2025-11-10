import { matchedData, validationResult } from "express-validator";
import dbDelete from '../db/queries/delete.js';

async function deleteProduct (req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new Error(error.array().join(','));
  }

  const { id } = matchedData(req, { locations: ['params'] });

  try {
    await dbDelete.deleteProduct(id);
  } catch (err) {
    res.send(err.detail);
    return;
  }

  res.redirect('/products');
}

async function deleteStock (req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new Error(error.array().join(','));
  }

  const { id } = matchedData(req, { locations: ['params'] });

  try {
    await dbDelete.deleteStock(id);
  } catch (err) {
    res.send(err.detail);
    return;
  }

  res.redirect('/stocks');
}

async function deleteCategory (req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new Error(error.array().join(','));
  }

  const { id } = matchedData(req, { locations: ['params'] });

  try {
    await dbDelete.deleteCategory(id);
  } catch (err) {
    res.send(err.detail);
    return;
  }

  res.redirect('/categories');
}

export default { deleteProduct, deleteStock, deleteCategory };