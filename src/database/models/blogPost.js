const BlogPost = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    }, {
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'BlogPosts',
    });

    BlogPost.associate = (db) => {
        BlogPost.belongsTo(db.User, { as: 'user', foreignKey: 'userId' })
    }
  
    return BlogPost;
  };
  
  module.exports = BlogPost;