const Product = require('../models/Product');

// Função para buscar um produto e salvar no banco
const searchProduct = async (req, res) => {
    const { name, price, url } = req.query;

    try {
        let product = await Product.findOne({ name });

        if (!product) {
            // Se o produto não existir, cria um novo
            product = new Product({ name, currentPrice: price, url });
            await product.save();
        } else {
            // Caso o produto já exista, atualiza o histórico de preços
            product.priceHistory.push({ price });
            product.currentPrice = price;
            await product.save();
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error while searching for product', error });
    }
};

// Função para obter o histórico de preços
const getPriceHistory = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product.priceHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching price history', error });
    }
};

module.exports = { searchProduct, getPriceHistory };
