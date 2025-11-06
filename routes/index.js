import { Router } from "express";
import controller from '../controller/get.js';

const indexRoute = Router();

indexRoute.get('/', controller.getIndex);

export default indexRoute;