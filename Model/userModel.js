module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      otp:{
        type:DataTypes.INTEGER,
        allowNull:true,
      },
      
      oauth_user:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
      },

    });
    return User;
  };