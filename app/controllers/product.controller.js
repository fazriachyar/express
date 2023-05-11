const db = require("../models");
const Product = db.product;
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Please Insert Payload."
    });
    return;
  }

  const product = {
    name: req.body.name,
    quantity: req.body.quantity,
    weight: req.body.weight
  }

    //save to db
    Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Product."
      });
    });
}

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

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

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(
      num => {
        if (num == 1) {
          res.send({
            message: "Product was updated successfully."
          });
        }
        else {
          res.send({
            message: `Product not found or req.body is not defined.`
          });
        }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      }
      else {
        res.send({
          message: "Product not found or req.body is not defined."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};