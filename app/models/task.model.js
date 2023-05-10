module.exports = (sequilize, Sequelize) => {
  const Task = sequilize.define("task",{
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

  return Task;
};