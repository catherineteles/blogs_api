const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    displayName: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'Users',
    underscored: true,
  });

  return User;
};

module.exports = User;