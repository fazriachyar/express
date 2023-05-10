module.exports = (sequilize, Sequelize) => {
  const Tutorial = sequilize.define("tutorial",{
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Tutorial;
};