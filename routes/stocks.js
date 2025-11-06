import { Router } from "express";
import controller from '../controller/get.js';

const stocksRoute = Router();

stocksRoute.get('/', controller.getStocks);

export default stocksRoute;