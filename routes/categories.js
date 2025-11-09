import { Router } from "express";
import controller from '../controller/get.js';
import postController from '../controller/post.js';
import { body } from "express-validator";

const categoriesRoute = Router();

categoriesRoute.get('/', controller.getCategories);

categoriesRoute.route('/add')
  .get(controller.getCategoriesForm)
  .post([
    body('category').trim().notEmpty()
  ], postController.postCategories)

export default categoriesRoute;