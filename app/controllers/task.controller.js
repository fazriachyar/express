const db = require("../models");
const Task = db.tasks;
const Comment = db.comments;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Please Insert Payload."
    });
    return;
  }

  //create new task
  const task = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    userId: req.userId
  };

  //save to db
  Task.create(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Task."
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Task.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      req.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tasks."
      });
    });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find task with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id
      });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(
      num => {
        if (num == 1) {
          res.send({
            message: "Task was updated successfully."
          });
        }
        else {
          res.send({
            message: `Task not found or req.body is not defined.`
          });
        }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task with id=" + id
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!"
        });
      }
      else {
        res.send({
          message: "Task not found or req.body is not defined."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id
      });
    });
};

// Find all published Tasks
exports.findAllPublished = (req, res) => {
  Task.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

exports.createComment = (req, res) => {
  if (!req.body.text) {
    res.status(400).send({
      message: "Please Insert Your Comment!"
    });
    return;
  }

  const id = req.userId;

  User.findByPk(id)
    .then(data => {
      if (data) {
        //create new comment
        const comment = {
          name: data.username,
          text: req.body.text,
          taskId: req.body.taskId,
          userId: req.userId
        };

        const name = data.username;

        Comment.create(comment)
        .then(data => {
          res.send({ message: `Insert Comment Success by ${name}.` });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while inserting."
          });
        });
      }
      else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id
      });
    });
};

exports.findCommentByTaskId = (req, res) => {
  if (!req.body.taskId) {
    res.status(400).send({
      message: "Please Insert Task Id!"
    });
    return;
  }

  const taskId = req.params.taskId;
  var condition = title ? { taskId: { [Op.like]: `%${taskId}%` } } : null;

  Comment.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      req.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tasks."
      });
    });
};
