import 'dotenv/config';
import express from 'express';
const app = express();
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import path from 'path';
import indexRoute from './routes/index.js';
import productsRoute from './routes/products.js';
import stocksRoute from './routes/stocks.js';
import categoriesRoute from './routes/categories.js';


const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const assetsPath = path.join(__dirname, 'public');
const navigations = [
  { link: 'Dashboard', href: '', svg: 'dashboard' },
  { link: 'Products', href: 'products', svg: 'products' },
  { link: 'Stocks', href: 'stocks', svg: 'stocks' },
  { link: 'Categories', href: 'categories', svg: 'categories' },
];

app.set('view engine', 'ejs');
app.set('navigations', navigations);

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/stocks', stocksRoute);
app.use('/categories', categoriesRoute);

app.listen(process.env.LOCAL_PORT, (err) => {
  if (err) {
    console.log('Server error');
    return;
  }

  console.log('Server Running');
})