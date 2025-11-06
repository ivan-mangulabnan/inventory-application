const getIndex = async (req, res) => {
  res.render('index', { link: 'dashboard' });
}

const getProducts = async (req, res) => {
  res.render('index', { link: 'products' });
}

export default { getIndex, getProducts };