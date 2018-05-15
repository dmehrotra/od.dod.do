module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contract_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      filing_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Filings',
          key: 'id',
          as: 'filing_id',
        },
      }
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Contracts'),
};