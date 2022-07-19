const sequelize = require("sequelize");

const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    displayName: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users',
  });

  User.associate = (db) => {
    User.hasMany(db.BlogPost, { as: 'BlogPost', foreignKey: 'userId' });
  }

  return User;
};

module.exports = User;