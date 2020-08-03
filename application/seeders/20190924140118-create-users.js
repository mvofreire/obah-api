"use strict";
const data = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: "$2a$08$Dp9m/R3WLcEbrvw7zGQXlensqzUcpJhIuZW9zAFyykwWwH4zF7guW",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "User Test",
    email: "user@gmail.com",
    password: "$2a$08$Dp9m/R3WLcEbrvw7zGQXlensqzUcpJhIuZW9zAFyykwWwH4zF7guW",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  }
};
