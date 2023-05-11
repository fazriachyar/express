const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const Role = db.role;

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ exrended: true}));

// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//     initial();
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

app.get("/", (req, res) => {
  res.json({message: "success initialization."});
});

require("./app/routes/task.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/product.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});