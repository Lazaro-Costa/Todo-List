const tasksModel = require('../models/tasksModel');

const getAll = async (request, response) => {
  const tasks = await tasksModel.getAll();
  return response.json(tasks);
};
module.exports = {
  getAll,
};
