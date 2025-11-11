import { Router } from "express";
import controller from '../controller/get.js';
import postController from '../controller/post.js';
import putController from '../controller/put.js';
import deleteController from '../controller/delete.js';
import { body, param, query } from "express-validator";

const categoriesRoute = Router();

categoriesRoute.get('/',[
  query('search').trim()
] , controller.getCategories);

categoriesRoute.route('/add')
  .get(controller.getCategoriesForm)
  .post([
    body('category').trim().notEmpty()
  ], postController.postCategories)

categoriesRoute.route('/edit/:id')
  .get([
    param('id').trim().isInt({ gt: 0 }).withMessage('should be an integer greater than 0').toInt()
  ], controller.getEditCategory)
  .put([
    param('id').trim().isInt({ gt: 0 }).withMessage('should be an integer greater than 0').toInt(),
    body('name').trim().notEmpty()
  ], putController.putEditedCategory)

categoriesRoute.delete('/delete/:id', [
  param('id').trim().isInt({ gt: 0 }).withMessage('should be an integer greater than 0').toInt()
], deleteController.deleteCategory)

export default categoriesRoute;