import { Model, DataTypes } from 'sequelize';

export interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  login: string;
  role: string;
}

class User extends Model<UserAttributes> implements UserAttributes{
  firstName!: string;
  lastName!: string;
  login!: string;
  role!: string;

  static associate(models: any) {
    // define association here
  }
}

export function init(sequelize: any) {
  
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    login: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

export default User;