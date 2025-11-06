import { Router } from 'express';
import controller from '../controller/get.js';
const productsRoute = Router();

productsRoute.get('/', controller.getProducts);

export default productsRoute;