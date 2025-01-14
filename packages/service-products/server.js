const express = require('express');
const cors = require('cors');

const mockProducts = require('./__mocks__/products.json');

const app = express();
app.use(cors());

app.get('/products', (_, res) => {
  return res.send(mockProducts);
});

app.get('/product/:code', (req, res) => {
  const code = req.params.code;
  const filteredProduct = mockProducts.results.filter((p) => p.code === code);
  return res.send(filteredProduct[0]);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen({ port: 4010 }, () =>
  console.log(`🚀 Service Products at http://localhost:4010`)
);
