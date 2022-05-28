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
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 25]
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
}

export default Product;