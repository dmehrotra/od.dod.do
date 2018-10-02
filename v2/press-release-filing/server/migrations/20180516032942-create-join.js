'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectRelationships', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')

      },
      ProjectId: {
           type: Sequelize.UUID,
           onDelete: 'CASCADE',
           references: {
                model: 'Projects',
                key: 'id'
           }
      },
      RelationshipId: {
           type: Sequelize.UUID,
           onDelete: 'CASCADE',
           references: {
                model: 'Relationships',
                key: 'id'
           }
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
    return queryInterface.dropTable('ProjectRelationships');
  }
};