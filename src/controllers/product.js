const Product = require('../models/product');
const { isAuthenticated, getConnectedUserLogin, isAdmin } = require('../util/auth');

module.exports.getProducts = (req, res) => {
    getProducts(req, res);
}

module.exports.save = (req, res) => {
    const {title, price, amount, postAction} = req.body;
    const connectedUserLogin = getConnectedUserLogin(req);

    if(postAction === 'update'){
        res.statusCode = 200;
        Product.findAll({where: {title: title}})
        .then(products => {
            if(products && products.length>0){
                products[0].price = price;
                products[0].amount = amount;
                return products[0].save();
            }
            return new Promise((_, reject) => {reject('Product does not exist!')});
        })
        .then(() => {
            getProducts(req, res);
        })
        .catch(err => {console.log(err)});
    } else {
        res.statusCode = 201;
        Product.create({title, price, amount, userLogin: connectedUserLogin})
        .then(() => {
            getProducts(req, res);
        })
        .catch(err => {console.log(err)});
    }
}

const getProducts = (req, res) => {
    const connectedUserLogin = getConnectedUserLogin(req);
    Product.findAll({where: {userLogin: connectedUserLogin}})
    .then(products => {
        isAdmin(req, isAnAdmin => {
            res.render('product', {
                products: products,
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
    const title = req.params.title;

    res.setHeader('Content-Type', 'text/plain');

    Product.findAll({where: {title: title}})
        .then(products => {
            if(products && products.length>0){
                return products[0].destroy();
            }
            return new Promise((_, reject) => {reject('Product does not exist!')});
        })
        .then(() => {
            res.statusCode = 200;
            res.end('product deleted with success!')
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 404;
            res.end(err.message);
        });
}