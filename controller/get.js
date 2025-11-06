const getIndex = async (req, res) => {
  res.render('index', { link: 'dashboard' });
}

const getProducts = async (req, res) => {
  res.render('index', { link: 'products' });
}

const getStocks = async (req, res) => {
  res.render('index', { link: 'stocks' });
}

const getCategories = async (req, res) => {
  res.render('index', { link: 'categories' });
}

export default { getIndex, getProducts, getStocks, getCategories };