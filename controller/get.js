const getIndex = async (req, res) => {
  const navigations = req.app.get('navigations');
  res.render('index', { link: 'dashboard', navigations });
}

const getProducts = async (req, res) => {
  const navigations = req.app.get('navigations');
  res.render('index', { link: 'products', navigations });
}

const getStocks = async (req, res) => {
  const navigations = req.app.get('navigations');
  res.render('index', { link: 'stocks', navigations });
}

const getCategories = async (req, res) => {
  const navigations = req.app.get('navigations');
  res.render('index', { link: 'categories', navigations });
}

export default { getIndex, getProducts, getStocks, getCategories };