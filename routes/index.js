import { Router } from "express";
import controller from '../controller/get.js';

const indexRoute = Router();

indexRoute.get('/', controller.getIndex);
indexRoute.use((err, req, res, next) => {
  const navigations = req.app.get('navigations');
  res.locals.home = '/';
  res.locals.route = 'Dashboard';
  res.locals.err = err;
  res.render('index', { link: 'error', navigations, data: null });
});

export default indexRoute;