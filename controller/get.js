const getIndex = async (req, res) => {
  res.render('index', { link: 'dashboard' });
}

export default { getIndex };