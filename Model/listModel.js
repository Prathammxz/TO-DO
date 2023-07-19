module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define("list", {
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      completed:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
      },

      date:{
        type:DataTypes.DATE,
        allowNull: false,
      }
      

    });
    return List;
  };