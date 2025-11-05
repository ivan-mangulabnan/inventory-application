import { Router } from "express";

const indexRoute = Router();

indexRoute.get('/', (req, res) => {
  res.send('Index Route');
});

export default indexRoute;