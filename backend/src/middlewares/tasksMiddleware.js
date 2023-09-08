const validateBody = (request, response, next) => {
  const { body } = request;
  if (body.title === undefined) {
    return response
      .status(400)
      .json({ message: 'O campo title e obrigatorio.' });
  } else if (body.title === '') {
    return response
      .status(400)
      .json({ message: 'O campo title nao pode ser vazio.' });
  } else {
    next();
  }
};
module.exports = { validateBody };
