const Product = require('../models/product');
const { isAuthenticated } = require('../util/auth');

module.exports.getProducts = (req, res) => {
    Product.getProducts(data => {
        res.render('product', {
            products: data,
            pageTitle: 'Products Page',
            page: 'product',
            isAuthenticated: isAuthenticated(req),
        });
    });
}

module.exports.save = (req, res) => {
    const {title, price, amount, postAction} = req.body;
    const product = new Product(title, price, amount);

    if(postAction === 'update'){
        res.statusCode = 200;
        product.update(() => {
            Product.getProducts(data => {
                res.render('product', {
                    products: data,
                    pageTitle: 'Products Page',
                    page: 'product',
                    isAuthenticated: isAuthenticated(req),
                });
            });
        });
    } else {
        res.statusCode = 201;
        product.add(() => {
            Product.getProducts(data => {
                res.render('product', {
                    products: data,
                    pageTitle: 'Products Page',
                    page: 'product',
                    isAuthenticated: isAuthenticated(req),
                });
            });
        });
    }
}

module.exports.delete = (req, res) => {
    const title = req.url.split('title=')[1];
    Product.delete(title, () => {
        res.setHeader('Content-Type', 'text/plain');
        res.end('success');
    });
}