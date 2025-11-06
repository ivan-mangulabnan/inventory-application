import { Router } from "express";
import controller from '../controller/get.js';

const categoriesRoute = Router();

categoriesRoute.get('/', controller.getCategories);

export default categoriesRoute;