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
  res.render('index', { link: 'products', navigations, data: null });
}

const getStocks = async (req, res) => {
  const navigations = req.app.get('navigations');
  res.render('index', { link: 'stocks', navigations, data: null });
}

const getCategories = async (req, res) => {
  const navigations = req.app.get('navigations');
  res.render('index', { link: 'categories', navigations, data: null });
}

export default { getIndex, getProducts, getStocks, getCategories };