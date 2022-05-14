const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', '..', 'data', 'products.json');

module.exports = class Product {
    constructor(title, price, amount) {
        this.title = title;
        this.price = price;
        this.amount = amount;
    }

    add(callback){
        const {title, price, amount} = this;

        readFile(data => {
            if(!data.some(product => product.title === title)){
                data.push({title, price, amount});
            }
            writeFile(data, callback);
        });
    }

    update(callback) {
        const {title, price, amount} = this;
        readFile(data => {
            for(let p of data){
                if(p.title === title){
                    p.price = price;
                    p.amount = amount;
                    break;
                }
            }
            writeFile(data, callback);
        });
    }

    static delete(title, callback) {
        readFile(data => {
            data = data.filter(product => product.title !== title);
            writeFile(data, callback);
        });
    }

    static getProducts(callback){
        readFile(data => {
            callback(data);
        });
    }
}

const writeFile = (product, callback) => {
    fs.writeFile(p, JSON.stringify(product), err => {
        console.log(err);
    }, () => {
        callback('product saved with success!');
    });
}

const readFile = (callback) => {
    return fs.readFile(p, (err, fileContent) => {
        if(err){
            console.log(err);
            callback([]);
        } else {
           callback(JSON.parse(fileContent));
        }
    })
}