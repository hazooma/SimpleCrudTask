import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validateRegister, validateLogin } from '../validations/UserValidations';

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
              message: 'User added successfully!!!',
              data: result,
            });
          }
        },
      );
    })
    .catch(er => res.json({
      status: 'Validation Fail',
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
          const token = jwt.sign({ id: userInfo._id, role: userInfo.role }, 'secretkey', {
            expiresIn: '2h',
          });

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
