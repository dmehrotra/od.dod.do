module.exports = function(sequelize, DataTypes){
  const Project = sequelize.define('Project', {
    
    full_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contract_numbers: {
      type: DataTypes.TEXT
    },
    amount: {
        type: DataTypes.FLOAT
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    filing_date:{
      type: DataTypes.DATE,
      allowNull: false
    },
    tsv:{
      type: DataTypes.TEXT
    }

  });


  Project.associate = function(models){

    Project.belongsTo(models.Department)

    Project.belongsToMany(models.Relationship, {
         through: models.ProjectRelationship, 
         foreignKey: 'ProjectId',
         onDelete: 'CASCADE'
    });
  };

  return Project;
};
