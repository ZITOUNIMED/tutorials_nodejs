import Product from "../../models/product";

export function deleteUserProducts(userId: number): Promise<any>{
     return Product.findAll({where: {UserId: userId}})
     .then(products => {
        return Promise.all(products.map(product => product.destroy()))
     });
}