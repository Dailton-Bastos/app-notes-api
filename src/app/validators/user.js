const Yup = require('yup');

const db = require('../../database/connection');

exports.post = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      error: 'Validation fails',
    });
  }

  const userExists = await db('users').where({ email: req.body.email });

  if (userExists.length) {
    return res.status(400).json({
      error: 'Email already exists!',
    });
  }

  return next();
};
