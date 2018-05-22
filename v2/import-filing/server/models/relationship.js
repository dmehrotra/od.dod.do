module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });
  Relationship.associate = function(models){
    Relationship.belongsToMany(models.Project, {
         through: models.ProjectRelationship,
         foreignKey: 'RelationshipId',
         onDelete: 'CASCADE'
    });
  };
    return Relationship;
};

