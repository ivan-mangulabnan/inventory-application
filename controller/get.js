import { matchedData, validationResult } from 'express-validator';
import dbGet from '../db/queries/get.js';

const getIndex = async (req, res, next) => {
  const navigations = req.app.get('navigations');
  let data;

  try {
    const [
      totalProducts, 
      totalStocks, 
      totalCategories,
      totalProductsWithoutStock,
      totalProductsInStock,
      totalUnusedCategories
    ] = await Promise.all([
      dbGet.getTotalProducts(),
      dbGet.getTotalStocks(),
      dbGet.getTotalCategories(),
      dbGet.getTotalProductsWithoutStock(),
      dbGet.getTotalProductsInStock(),
      dbGet.getTotalUnusedCategories()
    ]);

    data = { 
      totalProducts, 
      totalStocks, 
      totalCategories, 
      totalProductsWithoutStock,
      totalProductsInStock,
      totalUnusedCategories
    };
  } catch (err) {
    return next(err);
  }
  
  res.render('index', { link: 'dashboard', navigations, data });
}

const getProducts = async (req, res, next) => {
  const navigations = req.app.get('navigations');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors.array().join(','));
  }

  const { search } = matchedData(req, { locations: ['query'] });

  let data;
  try {
    data = await dbGet.getProductsWithCategory(search);
  } catch (err) {
    return next(err);
  }

  res.render('index', { link: 'products', navigations, data });
}

const getStocks = async (req, res, next) => {
  const navigations = req.app.get('navigations');
  let data;

  try {
    data = await dbGet.getStocksWithProductName();
  } catch (err) {
    return next(err);
  }

  res.render('index', { link: 'stocks', navigations, data });
}

const getCategories = async (req, res, next) => {
  const navigations = req.app.get('navigations');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  const { search } = matchedData(req, { locations: ['query'] });

  let data;
  try {
    data = await dbGet.getCategories(search);
  } catch (err) {
    return next(err);
  }

  res.render('index', { link: 'categories', navigations, data });
}

const getProductsForm = async (req, res, next) => {
  const navigations = req.app.get('navigations');
  let data;

  try {
    data = await dbGet.getCategories();
  } catch (err) {
    return next(err);
  }
  
  res.render('index', { link: 'add-product', navigations, data });
}

const getStockForm = async (req, res, next) => {
  const id = Number(req.params.id);
  const navigations = req.app.get('navigations');
  let data;

  try {
    data = await dbGet.getSpecificStock(id);
  } catch (err) {
    return next(err);
  }
  
  res.render('index', { link: 'edit-stocks', navigations, data });
}

const getCategoriesForm = async (req, res) => {
  const navigations = req.app.get('navigations');
  res.render('index', { link: 'add-categories', navigations, data: null });
}

const getEditProducts = async (req, res, next) => {
  const navigations = req.app.get('navigations');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors.array().join(','));
  }

  const { id } = matchedData(req, { locations: ['params'] });

  let data;
  try {
    data = await dbGet.getSpecificProductWithCategory(id);
  } catch (err) {
    return next(err);
  }
  
  res.render('index', { link: 'edit-products', navigations, data });
}

const getEditCategory = async (req, res, next) => {
  const navigations = req.app.get('navigations');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors.array().join(','));
  }

  const { id } = matchedData(req, { locations: ['params'] });

  let data;
  try {
    data = await dbGet.getSpecificCategory(id);
  } catch (err) {
    return next(err);
  }
  
  res.render('index', { link: 'edit-categories', navigations, data });
}

const getIncludeProductInStock = async (req, res) => {
  const navigations = req.app.get('navigations');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors.array().join(','));
  }

  const { search } = matchedData(req, { locations: ['query'] });
  
  let data;
  try {
    data = await dbGet.getProductsNotInStock(search);
  } catch (err) {
    return next(err);
  }
  
  res.render('index', { link: 'add-stocks', navigations, data });
}

export default { 
  getIndex, 
  getProducts, 
  getStocks, 
  getCategories,
  getProductsForm,
  getStockForm,
  getCategoriesForm,
  getEditProducts,
  getEditCategory,
  getIncludeProductInStock
};