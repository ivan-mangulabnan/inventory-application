import dbGet from '../db/queries/get.js';

const getIndex = async (req, res) => {
  const navigations = req.app.get('navigations');
  let data;

  try {
    const [totalProducts, totalStocks, totalCategories] = await Promise.all([
      dbGet.getTotalProducts(),
      dbGet.getTotalStocks(),
      dbGet.getTotalCategories()
    ]);

    data = { totalProducts, totalStocks, totalCategories };
  } catch (err) {
    console.log(err);
  }
  
  res.render('index', { link: 'dashboard', navigations, data });
}

const getProducts = async (req, res) => {
  const navigations = req.app.get('navigations');
  let data;

  try {
    data = await dbGet.getProductsWithCategory();
  } catch (err) {
    console.log(err);
  }

  res.render('index', { link: 'products', navigations, data });
}

const getStocks = async (req, res) => {
  const navigations = req.app.get('navigations');
  let data;

  try {
    data = await dbGet.getStocksWithProductName();
  } catch (err) {
    console.log(err);
  }

  res.render('index', { link: 'stocks', navigations, data });
}

const getCategories = async (req, res) => {
  const navigations = req.app.get('navigations');
  let data;

  try {
    data = await dbGet.getCategories();
  } catch (err) {
    console.log(err);
  }

  res.render('index', { link: 'categories', navigations, data });
}

export default { getIndex, getProducts, getStocks, getCategories };