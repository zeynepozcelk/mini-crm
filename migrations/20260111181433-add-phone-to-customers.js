'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tabloyu şemasıyla birlikte açıkça belirtiyoruz
    await queryInterface.addColumn({ tableName: 'customers', schema: 'public' }, 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Geri alma işlemi için de aynı açık tanımlama
    await queryInterface.removeColumn({ tableName: 'customers', schema: 'public' }, 'phoneNumber');
  }
};