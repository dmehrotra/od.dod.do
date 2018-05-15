module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    contract_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Contract.associate = (models) => {
    Contract.belongsTo(models.Filing, {
      foreignKey: 'filing_id',
      onDelete: 'CASCADE',
    });
  };

  return Contract;
};