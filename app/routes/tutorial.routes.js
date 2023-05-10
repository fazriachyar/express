module.exports = app => {
  const { authJwt } = require("../middleware");
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // create new tutorial
  router.post("/",[authJwt.verifyToken], tutorials.create);

  // create new comment
  router.post("/create-comment",[authJwt.verifyToken], tutorials.createComment);

  // getAll comments
  router.get("/",[authJwt.verifyToken], tutorials.findCommentByTutorialId);

  // getAll tutorials
  router.get("/", tutorials.findAll);

  // getAll published tutorials
  router.get("/published", tutorials.findAllPublished);

  // find tutorial by id
  router.get("/:id", tutorials.findOne);

  // update tutorial by id
  router.put("/:id",[authJwt.verifyToken], tutorials.update);

  //delete tutorial by id
  router.delete("/:id",[authJwt.verifyToken], tutorials.delete);

  //delete all tutorials
  router.delete("/",[authJwt.verifyToken], tutorials.deleteAll);

  app.use('/api/tutorials', router);
}