const BlogPost = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    }, {
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'BlogPosts',
    });

    BlogPost.associate = (db) => {
        BlogPost.belongsTo(db.User, { as: 'User', foreignKey: 'userId' })
    }
  
    return BlogPost;
  };
  
  module.exports = BlogPost;