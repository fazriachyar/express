module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // create new tutorial
  router.post("/", tutorials.create);

  // getAll tutorials
  router.get("/", tutorials.findAll);

  // getAll published tutorials
  router.get("/published", tutorials.findAllPublished);

  // find tutorial by id
  router.get("/:id", tutorials.findOne);

  // update tutorial by id
  router.put("/:id", tutorials.update);

  //delete tutorial by id
  router.delete("/:id", tutorials.delete);

  //delete all tutorials
  router.delete("/", tutorials.deleteAll);

  app.use('/api/tutorials', router);
}