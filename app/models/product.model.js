module.exports = (sequilize, Sequelize) => {
  const Product = sequilize.define("product", {
    name: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    weight: {
      type: Sequelize.INTEGER,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Product;
};
