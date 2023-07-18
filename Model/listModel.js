module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define("list", {
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      

    });
    return List;
  };