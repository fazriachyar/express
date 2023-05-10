const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST ,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tasks = require("./task.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.comments = require("../models/comment.model.js")(sequelize, Sequelize);

db.user.hasMany(db.tasks, { as: "tasks" });
db.tasks.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users"
})

db.tasks.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tasks, {
  foreignKey: "taskId",
  as: "task",
});

db.user.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;