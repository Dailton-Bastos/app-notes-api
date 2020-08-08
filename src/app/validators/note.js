const Yup = require('yup');

exports.post = async (req, res, next) => {
  const schema = Yup.object().shape({
    title: Yup.string().required(),
    body: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      error: 'Validation fails',
    });
  }

  return next();
};

exports.update = async (req, res, next) => {
  const schema = Yup.object().shape({
    title: Yup.string(),
    body: Yup.string(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      error: 'Validation fails',
    });
  }

  return next();
};
