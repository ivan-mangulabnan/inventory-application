import dbPost from '../db/queries/post.js';
import { validationResult, matchedData } from 'express-validator';

async function postProduct (req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);
  try {
    await dbPost.postProduct(data.name, data.price, data.category, data.quantity);
  } catch (err) {
    return res.status(500).send('Database Error');
  }

  res.redirect('/products');
}

async function postCategories (req, res) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).send('invalid category value');
  }

  const { category } = matchedData(req);
  
  try {
    await dbPost.postCategory(category);
  } catch (err) {
    throw new Error (err);
  }

  res.redirect('/categories');
}

export default { postProduct, postCategories };