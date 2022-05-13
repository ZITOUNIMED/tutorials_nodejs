const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    res.statusCode = 201;
    const {title, price, amount, postAction} = req.body;
    if(!products.some(product => product.title === title)){
        products.push({title, price, amount});
    } else if(postAction === 'update'){
        products.forEach(product => {
            if(product.title === title){
                product.price = price;
                product.amount = amount;
            }
        });
    }
    res.render('product', {
        products: products,
        pageTitle: 'Products Page',
        page: 'product'
    });
});

router.delete('/', (req, res) => {
    const title = req.url.split('title=')[1];
    products = products.filter(product => product.title !== title);
    res.setHeader('Content-Type', 'text/plain');
    res.end('success');
});

router.get('/', (req, res) => {
    res.render('product', {
        products: products,
        pageTitle: 'Products Page',
        page: 'product'
    });
});

let products = [{title: "t1", price: '1', amount: '42'}, {title: "t2", price: '34', amount: '2'}, {title: "t3", price: '53', amount: '6'}];

exports.productRoutes = router;