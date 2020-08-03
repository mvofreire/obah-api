"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("client", "recovery_password_token", {
      type: Sequelize.STRING(255),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("client", "recovery_password_token");
  },
};
