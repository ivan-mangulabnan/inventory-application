import dbPost from '../db/queries/post.js';
import { validationResult, matchedData } from 'express-validator';

async function postProduct (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(errors.array().join(','));
  }

  const data = matchedData(req);
  try {
    await dbPost.postProduct(data.name, data.price, data.category);
  } catch (err) {
    return next(err);
  }

  res.redirect('/products');
}

async function postCategories (req, res, next) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(error.array().join(','));
  }

  const { category } = matchedData(req);
  
  try {
    await dbPost.postCategory(category);
  } catch (err) {
    return next(err);
  }

  res.redirect('/categories');
}

async function postStock (req, res) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(error.array().join(','));
  }

  const { id } = matchedData(req, { locations: ['params'] });

  try {
    await dbPost.postStock(id);
  } catch (err) {
    return next(err);
  }

  res.redirect('/stocks');
}

export default { postProduct, postCategories, postStock };