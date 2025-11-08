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

export default { postProduct };