import { Model, DataTypes } from 'sequelize';

export interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  login: string;
  role: string;
  email?: string;
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
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 25]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 25]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    login: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 15]
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
}

export default User;