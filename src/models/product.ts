import { Model, DataTypes } from 'sequelize';

export interface ProductAttributes {
  id?: number;
  title: string;
  price: number;
  amount: number;
  UserId?: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes{
  title!: string;
  price!: number;
  amount!: number;

  static associate(models: any) {
    Product.belongsTo(models.User);
  }
}

export function init(sequelize: any) {
  Product.init({
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    amount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

export default Product;