const validateTitle = (request, response, next) => {
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

const validateStatus = (request, response, next) => {
  const { body } = request;
  if (body.status === undefined) {
    return response
      .status(400)
      .json({ message: 'O campo status e obrigatorio.' });
  } else if (body.status === '') {
    return response
      .status(400)
      .json({ message: 'O campo status nao pode ser vazio.' });
  } else {
    next();
  }
};
module.exports = { validateTitle, validateStatus };
