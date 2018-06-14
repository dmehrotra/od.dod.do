'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')

      },
      full_text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      checked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      contract_numbers: {
        type: Sequelize.TEXT
      },

      DepartmentId: {
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: 'Departments',
          key: 'id'
        }
      },
      filing_date:{
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Projects');
  }
};