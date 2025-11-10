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
    console.log(err.detail);
    res.send(err.detail);
    return;
  }

  res.redirect('/products');
}

export default { deleteProduct };