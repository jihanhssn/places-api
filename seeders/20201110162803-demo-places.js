'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('places',[{
     name:'some place',
     image:'default.png'
   }],{})

   const place = await queryInterface.sequelize.query(
    `SELECT place_id from places;`
  );

  const place_id = place[0];

  return await queryInterface.bulkInsert('comments', [
    {
      comment:'some comment',
      place_id:place_id[0].place_id
    }
  ],{});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('places', null, {})
    await queryInterface.bulkDelete('comments', null, {})

  }
};
