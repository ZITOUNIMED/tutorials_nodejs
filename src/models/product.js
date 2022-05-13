let products = [{title: "t1", price: '1', amount: '42'}, {title: "t2", price: '34', amount: '2'}, {title: "t3", price: '53', amount: '6'}];

module.exports = class Product {
    constructor(title, price, amount) {
        this.title = title;
        this.price = price;
        this.amount = amount;
    }

    add(){
        const {title, price, amount} = this;
        if(!products.some(product => product.title === title)){
            products.push({title, price, amount});
        }
    }

    update() {
        const {title, price, amount} = this;
        for(let p of products){
            if(p.title === title){
                p.price = price;
                p.amount = amount;
                break;
            }
        }
    }

    static delete(title) {
        products = products.filter(product => product.title !== title);
    }

    static getProducts(){
        return products;
    }
}