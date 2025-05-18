"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ProjectTypes", [
      {
        name: "Web Development",
        description: "Projects focused on building websites and web applications.",
      },
      {
        name: "Mobile Development",
        description: "Projects focused on building mobile applications for iOS and Android.",
      },

      {
        name: "Data Science",
        description: "Projects involving data analysis, machine learning, and AI.",
      },

      {
        name: "Game Development",
        description: "Projects focused on creating video games across various platforms.",
      },

      {
        name: "DevOps",
        description: "Projects that involve automation, CI/CD, and infrastructure management.",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ProjectTypes", null, {});
  },
};
