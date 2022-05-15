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
        product.update().then(() => {
            getProducts(req, res);
        })
        .catch(err => {console.log(err)});
    } else {
        res.statusCode = 201;
        product.add().then(() => {
            getProducts(req, res);
        })
        .catch(err => {console.log(err)});
    }
}

const getProducts = (req, res) => {
    const connectedUserLogin = getConnectedUserLogin(req);
    Product.getProducts(connectedUserLogin)
    .then(([data, _]) => {
        isAdmin(req, isAnAdmin => {
            res.render('product', {
                products: data,
                pageTitle: 'Products Page',
                page: 'product',
                isAuthenticated: isAuthenticated(req),
                isAdmin: isAnAdmin
            });
        })
    })
    .catch(err => {console.log(err)})
}

module.exports.delete = (req, res) => {
    const title = req.url.split('title=')[1];
    Product.delete(title).then( () => {
        res.setHeader('Content-Type', 'text/plain');
        res.end('success');
    }).catch(err => {console.log(err)});
}