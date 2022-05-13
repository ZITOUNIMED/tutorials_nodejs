const Product = require('../models/product');

module.exports.getProducts = (req, res) => {
    res.render('product', {
        products: Product.getProducts(),
        pageTitle: 'Products Page',
        page: 'product'
    });
}

module.exports.save = (req, res) => {
    const {title, price, amount, postAction} = req.body;
    const product = new Product(title, price, amount);

    if(postAction === 'update'){
        res.statusCode = 200;
        product.update();
    } else {
        res.statusCode = 201;
        product.add();
    }
    
    res.render('product', {
        products: Product.getProducts(),
        pageTitle: 'Products Page',
        page: 'product'
    });
}

module.exports.delete = (req, res) => {
    const title = req.url.split('title=')[1];
    Product.delete(title);
    res.setHeader('Content-Type', 'text/plain');
    res.end('success');
}