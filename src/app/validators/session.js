const Yup = require('yup');
const db = require('../../database/connection');

const { checkPassword } = require('../../libs/utils');

exports.post = async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      error: 'Validation fails',
    });
  }

  const { email, password } = req.body;

  try {
    const results = await db('users').where({ email });

    const user = results[0];

    if (!user) {
      return res.status(401).json({
        error: 'Incorrect email or password!',
      });
    }

    if (!(await checkPassword(password, user.password))) {
      return res.status(401).json({
        error: 'Incorrect email or password!',
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(500).json({
      error: 'Internal error please try again!',
    });
  }
};
