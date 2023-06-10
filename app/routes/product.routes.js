module.exports = function(app) {
  const { authJwt } = require("../middleware");
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // create new task
  router.post("/", [authJwt.verifyToken], products.create);

  // create new comment
  // router.post("/create-comment", [authJwt.verifyToken], products.createComment);

  // getAll comments
  // router.get("/", [authJwt.verifyToken], products.findCommentByTaskId);

  // getAll products
  router.get("/", products.findAll);

  // getAll published products
  // router.get("/published", products.findAllPublished);

  // find task by id
  // router.get("/:id", products.findOne);

  // update task by id
  router.put("/:id", [authJwt.verifyToken], products.update);

  //delete task by id
  router.delete("/:id", [authJwt.verifyToken], products.delete);

  app.use("/api/products", router);
};
