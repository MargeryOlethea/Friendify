'use strict';
const fs = require('fs').promises;


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/profiles.json', 'utf8'));
    let result = data.map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date();
      return el
    })
    console.log(result);
    await queryInterface.bulkInsert('Profiles', result)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
