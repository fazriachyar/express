module.exports = function(app) {
  const { authJwt } = require("../middleware");
  const tasks = require("../controllers/task.controller.js");

  var router = require("express").Router();

  // create new task
  router.post("/",[authJwt.verifyToken], tasks.create);

  // create new comment
  router.post("/create-comment",[authJwt.verifyToken], tasks.createComment);

  // getAll comments
  router.get("/",[authJwt.verifyToken], tasks.findCommentByTaskId);

  // getAll tasks
  router.get("/", tasks.findAll);

  // getAll published tasks
  router.get("/published", tasks.findAllPublished);

  // find task by id
  router.get("/:id", tasks.findOne);

  // update task by id
  router.put("/:id",[authJwt.verifyToken], tasks.update);

  //delete task by id
  router.delete("/:id",[authJwt.verifyToken], tasks.delete);

  app.use('/api/tasks', router);
}