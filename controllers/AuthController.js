import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import redis from 'redis';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validateRegister, validateLogin } from '../validations/UserValidations';

const redisClient = redis.createClient(6379, 'redis');
config();

const create = (req, res, next) => {
  validateRegister(req.body)
    .then(() => {
      User.findOne({ email: req.body.email }, (error, existinguser) => {
        if (error) {
          console.log(error);
        }
        if (existinguser) {
          res.json({
            status: 'Failed',
            message: 'User Exists Already!!!',
            data: null,
          });
        } else {
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
        }
      });
    })
    .catch(er => res.json({
      status: 'Validations Fail !',
      message: er.message,
      data: null,
    }));
};

const login = (req, res, next) => {
  validateLogin(req.body).then(() => {
    User.findOne({ email: req.body.email }, (err, userInfo) => {
      if (err) {
        next(err);
      } else if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
        jwt.sign({ user_id: userInfo._id }, process.env.SECRET_KEY, (error, token) => {
          if (error) {
            res.json({
              status: 'Fail',
              message: 'Failed creating Token !',
              data: null,
            });
          }
          redisClient.set(token, 'logged');
          res.json({
            status: 'success',
            message: 'user found !',
            data: { user: userInfo, token },
          });
        });
      } else {
        res.json({
          status: 'error',
          message: 'Invalid email/password!!!',
          data: null,
        });
      }
    });
  });
};

const logout = (req, res) => {
  redisClient.del(req.body.token, (err, reply) => {
    res.json({
      status: 'success',
      message: 'Logged Out  !',
      data: null,
    });
  });
};

export { create, login, logout };
