module.exports = function(sequelize, DataTypes){
  const Filing = sequelize.define('Filing', {
    full_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT
    },
  });

  Filing.associate = (models) => {
    Filing.hasMany(models.Contract, {
      foreignKey: 'filing_id',
      as: 'contracts',
    });
  };
  Filing.associate = (models) => {
    Filing.belongsTo(models.Department, {
      foreignKey: 'department_id',
      onDelete: 'CASCADE',
    });
  };

  return Filing;
};