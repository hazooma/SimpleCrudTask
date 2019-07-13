import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { validateRegister, validateLogin } from '../validations/UserValidations';

config();

const create = (req, res, next) => {
  validateRegister(req.body)
    .then(() => {
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
        (err, result) => {
          if (err) next(err);
          else {
            res.json({
              status: 'success',
              message: 'User Created successfully!!!',
              data: result,
            });
          }
        },
      );
    })
    .catch(er => res.json({
      status: 'Validations Fail !',
      message: er.message,
      data: null,
    }));
};

const login = (req, res, next) => {
  validateLogin(req.body)
    .then(() => {
      User.findOne({ email: req.body.email }, (err, userInfo) => {
        if (err) {
          next(err);
        } else if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { user_id: userInfo._id, role_id: userInfo.role },
            process.env.SECRET_KEY,
            {
              expiresIn: '2h',
            },
          );

          res.json({
            status: 'success',
            message: 'user found !',
            data: { user: userInfo, token },
          });
        } else {
          res.json({
            status: 'error',
            message: 'Invalid email/password!!!',
            data: null,
          });
        }
      });
    })
    .catch(er => res.json({
      status: 'Validation Fail',
      message: er.message,
      data: null,
    }));
};

export { create, login };
