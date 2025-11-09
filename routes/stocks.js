import { Router } from "express";
import controller from '../controller/get.js';
import patchController from '../controller/patch.js';
import { body, param } from "express-validator";

const stocksRoute = Router();

stocksRoute.get('/', controller.getStocks);

stocksRoute.route('/edit/:id')
  .get(controller.getStockForm)
  .patch([
    body('quantity').trim().notEmpty().withMessage('quantity should never be empty').isInt({ min: 0 }).withMessage('quantity should be equal or greater than 0'),
    param('id').trim().isInt({ min: 1 }).withMessage('id should be integer and is not less than 1')
  ], patchController.updateStockQuantity)

export default stocksRoute;