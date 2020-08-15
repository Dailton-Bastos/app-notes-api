const Yup = require('yup');

const db = require('../../database/connection');

const { checkPassword } = require('../../libs/utils');

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

exports.update = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(6),
    password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) => {
        return oldPassword ? field.required() : field;
      }),
    confirmPassword: Yup.string().when('password', (password, field) => {
      return password ? field.required().oneOf([Yup.ref('password')]) : field;
    }),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      error: 'Validation fails',
    });
  }

  const { email, oldPassword } = req.body;

  const results = await db('users').where({ id: req.userId }).returning('*');

  const user = results[0];

  if (email && email !== user.email) {
    const userExists = await db('users').where({ email }).returning('*');

    if (userExists.length) {
      return res.status(400).json({
        error: 'User already exists!',
      });
    }
  }

  let passwordMatch = true;

  if (oldPassword) {
    passwordMatch = await checkPassword(oldPassword.toString(), user.password);
  }

  if (oldPassword && !passwordMatch) {
    return res.status(401).json({
      error: 'Password does not match!',
    });
  }

  return next();
};
