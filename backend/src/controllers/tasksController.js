const getAll = (request, response) => {
  return response.json({ message: 'O controller esta funcionando' });
};
module.exports = {
  getAll,
};
