const { User, Post } = require('../models');

const root = { 
  hello: () => 'Hello world!' ,
  users: async () => {
    const users = await User.findAll(
    )
    console.log(users);
    return users;
  },
  user: async (id) => {
    const user = await User.findOne({
      where: id
    } );
    return user;
  },
  posts: async () => {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick', 'email'],
      },
      order: [['createdAt', 'DESC']],
    })
    return posts;
  }
};

module.exports = root;