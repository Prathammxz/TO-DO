module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "todo",
    dialect: "mysql",
    timezone: "+05:45",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };