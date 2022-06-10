import { Model, DataTypes } from 'sequelize';

export interface CredentialsAttributes {
  id?: number;
  login: string;
  password: string;
  isTemporary?: boolean;
}

class Credentials extends Model<CredentialsAttributes> implements CredentialsAttributes {
  login!: string;
  password!: string;

  static associate(models: any) {
    // define association here
  }
}

export function init(sequelize: any) {
  
  Credentials.init({
    login: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 15]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isTemporary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Credentials',
  });
  return Credentials;
}

export default Credentials;