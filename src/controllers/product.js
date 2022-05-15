const Product = require('../models/product');
const { isAuthenticated, getConnectedUserLogin, isAdmin } = require('../util/auth');

module.exports.getProducts = (req, res) => {
    getProducts(req, res);
}

module.exports.save = (req, res) => {
    const {title, price, amount, postAction} = req.body;
    const connectedUserLogin = getConnectedUserLogin(req);
    const product = new Product(title, price, amount, connectedUserLogin);

    if(postAction === 'update'){
        res.statusCode = 200;
        product.update(() => {
            getProducts(req, res);
        });
    } else {
        res.statusCode = 201;
        product.add(() => {
            getProducts(req, res);
        });
    }
}

const getProducts = (req, res) => {
    const connectedUserLogin = getConnectedUserLogin(req);
    Product.getProducts(connectedUserLogin, data => {
        isAdmin(req, isAnAdmin => {
            res.render('product', {
                products: data,
                pageTitle: 'Products Page',
                page: 'product',
                isAuthenticated: isAuthenticated(req),
                isAdmin: isAnAdmin
            });
        })
    });
}

module.exports.delete = (req, res) => {
    const title = req.url.split('title=')[1];
    Product.delete(title, () => {
        res.setHeader('Content-Type', 'text/plain');
        res.end('success');
    });
}