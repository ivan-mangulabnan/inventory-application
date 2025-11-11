import { Router } from 'express';
import controller from '../controller/get.js';
import postController from '../controller/post.js';
import putController from '../controller/put.js';
import deleteController from '../controller/delete.js';
import { body, param, query } from 'express-validator';

const productsRoute = Router();

productsRoute.get('/', [
  query('search').trim()
], controller.getProducts);

productsRoute.route('/add')
  .get(controller.getProductsForm)
  .post([
    body('name').trim().notEmpty().withMessage('name is required'),
    body('category').isInt({ min: 1 }).withMessage('category must be positive integer'),
    body('price').isFloat({ gt: 0 }).withMessage('price should be greater than 0')
  ], postController.postProduct)

productsRoute.route('/edit/:id')
  .get([
    param('id').isInt({ gt: 0 }).withMessage('should be an integer').toInt()
  ], controller.getEditProducts)
  .put([
    param('id').trim().isInt({ gt: 0 }).withMessage('should be an integer more than one').toInt(),
    body('name').trim().notEmpty().withMessage('name is required'),
    body('category').isInt({ min: 1 }).withMessage('category must be positive integer'),
    body('price').isFloat({ gt: 0 }).withMessage('price should be greater than 0')
  ], putController.putEditedProduct)

productsRoute.delete('/delete/:id', [
  param('id').trim().isInt({ gt: 0 }).withMessage('should be an integer more than one').toInt(),
], deleteController.deleteProduct);

export default productsRoute;