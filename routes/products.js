import { Router } from 'express';
import controller from '../controller/get.js';
import postController from '../controller/post.js';
import { body, param } from 'express-validator';

const productsRoute = Router();

productsRoute.get('/', controller.getProducts);

productsRoute.route('/add')
  .get(controller.getProductsForm)
  .post([
    body('name').trim().notEmpty().withMessage('name is required'),
    body('category').isInt({ min: 1 }).withMessage('category must be positive integer'),
    body('price').isFloat({ gt: 0 }).withMessage('price should be greater than 0'),
    body('quantity').isInt({ min: 0 }).withMessage('quantity should be equal or greater than 0')
  ], postController.postProduct)

productsRoute.route('/edit/:id')
  .get([
    param('id').isInt({ gt: 0 }).withMessage('should be an integer').toInt()
  ], controller.getEditProducts)
export default productsRoute;