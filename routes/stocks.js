import { Router } from "express";
import controller from '../controller/get.js';
import patchController from '../controller/patch.js';
import postController from '../controller/post.js';
import deleteController from '../controller/delete.js';
import { body, param, query } from "express-validator";

const stocksRoute = Router();

stocksRoute.get('/', controller.getStocks);

stocksRoute.route('/edit/:id')
  .get(controller.getStockForm)
  .patch([
    body('quantity').trim().notEmpty().withMessage('quantity should never be empty').isInt({ min: 0 }).withMessage('quantity should be equal or greater than 0'),
    param('id').trim().isInt({ min: 1 }).withMessage('id should be integer and is not less than 1')
  ], patchController.updateStockQuantity)

stocksRoute.get('/add', [
  query('search').trim()
], controller.getIncludeProductInStock)

stocksRoute.post('/add/:id', [
  param('id').trim().isInt({ gt: 0 }).withMessage('id should be integer and is not less than 1').toInt()
], postController.postStock)

stocksRoute.delete('/delete/:id',[
    param('id').trim().isInt({ min: 1 }).withMessage('id should be integer and is not less than 1')
  ], deleteController.deleteStock)

stocksRoute.use((err, req, res, next) => {
  const navigations = req.app.get('navigations');
  res.locals.home = '/stocks';
  res.locals.route = 'Stocks';
  res.locals.err = err;
  res.render('index', { link: 'error', navigations, data: null });
});
export default stocksRoute;