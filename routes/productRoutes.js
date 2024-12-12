const express = require('express');
const { searchProduct, getPriceHistory } = require('../controllers/productController');

const router = express.Router();

// Rota para buscar o produto e salvar o histórico de preços
router.get('/search', searchProduct);

// Rota para obter o histórico de preços de um produto
router.get('/:id/history', getPriceHistory);

module.exports = router;
