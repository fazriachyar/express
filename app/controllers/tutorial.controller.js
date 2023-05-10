const db = require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Please Insert Payload."
    });
    return;
  }

  //create new tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  //save to db
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      req.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(
      num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        }
        else {
          res.send({
            message: `Tutorial not found or req.body is not defined.`
          });
        }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
      else {
        res.send({
          message: "Tutorial not found or req.body is not defined."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
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
          tutorialId: req.body.tutorialId,
          userId: req.userId
        };

        Comment.create(comment)
        .then(data => {
          res.send(data);
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
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

exports.findCommentByTutorialId = (req, res) => {
  if (!req.body.tutorialId) {
    res.status(400).send({
      message: "Please Insert Tutorial Id!"
    });
    return;
  }

  const tutorialId = req.params.tutorialId;
  var condition = title ? { tutorialId: { [Op.like]: `%${tutorialId}%` } } : null;

  Comment.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      req.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tutorials."
      });
    });
};
