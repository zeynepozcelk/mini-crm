'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Customers tablosuna phoneNumber kolonunu ekliyoruz
    await queryInterface.addColumn('Customers', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Geri alma (rollback) durumunda kolonu siliyoruz
    await queryInterface.removeColumn('Customers', 'phoneNumber');
  }
};