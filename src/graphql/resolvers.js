const { User, Post } = require('../models');

const resolvers = { 
  Query: {
    hello: () => 'Hello world!' ,
    getAllUsers: async () => {
      const users = await User.findAll(
      )
      console.log(users);
      return users;
    },
    getUserById: async (id) => {
      const user = await User.findOne({
        where: id
      } );
      return user;
    },
    getAllPosts: async () => {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'nick', 'email'],
        },
        order: [['createdAt', 'DESC']],
      })
      return posts;
    },
    getPostById: async (id) => {
      const post = await Post.findOne({
        where: id
      });
      return post;
    },
  },
  
};

module.exports = resolvers;