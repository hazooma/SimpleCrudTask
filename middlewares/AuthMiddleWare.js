import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import User from '../models/User';

const redisClient = redis.createClient(6379, 'redis');
config();

const AuthMiddleWare = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
  if (!token) {
    res.json({
      status: 'error',
      message: 'Token not provided please login first !',
      data: null,
    });
  }
  redisClient.exists(token, (err, reply) => {
    if (reply === 1) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          res.json({
            status: 'error',
            message: 'Token not provided please login first !',
            data: null,
          });
        }
        // add user id to request
        req.body.userId = decoded.user_id;
        req.body.token = token;

        next();
      });
    } else {
      res.json({
        status: 'error',
        message: 'Token not provided or Invalid please login first !',
        data: null,
      });
    }
  });
};

const AuthMiddleWareIsBloger = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
  if (!token) {
    res.json({
      status: 'error',
      message: 'Token not provided please login first !',
      data: null,
    });
  }
  redisClient.exists(token, (err, reply) => {
    if (reply === 1) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          res.json({
            status: 'error',
            message: 'Token not provided please login first !',
            data: null,
          });
        }
        User.findOne({ _id: decoded.user_id }, (error, existinguser) => {
          if (error) {
            console.log(error);
          } else if (!existinguser) {
            res.json({
              status: 'Failed',
              message: 'User Does Not Exist !!!',
              data: null,
            });
          } else if (existinguser.role !== 'blogger') {
            res.json({
              status: 'Failed',
              message: 'Un Authorized Action !!!',
              data: null,
            });
          } else {
            // add user id to request
            req.body.userId = decoded.user_id;
            req.body.token = token;

            next();
          }
        });
      });
    } else {
      res.json({
        status: 'error',
        message: 'Token not provided or Invalid please login first !',
        data: null,
      });
    }
  });
};

const AuthMiddleWareIsAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
  if (!token) {
    res.json({
      status: 'error',
      message: 'Token not provided please login first !',
      data: null,
    });
  }
  redisClient.exists(token, (err, reply) => {
    if (reply === 1) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          res.json({
            status: 'error',
            message: 'Token not provided please login first !',
            data: null,
          });
        }
        User.findOne({ _id: decoded.user_id }, (error, existinguser) => {
          if (error) {
            console.log(error);
          } else if (!existinguser) {
            res.json({
              status: 'Failed',
              message: 'User Does Not Exist !!!',
              data: null,
            });
          } else if (existinguser.role !== 'admin') {
            res.json({
              status: 'Failed',
              message: 'Un Authorized Action !!!',
              data: null,
            });
          } else {
            // add user id to request
            req.body.userId = decoded.user_id;
            req.body.token = token;

            next();
          }
        });
      });
    } else {
      res.json({
        status: 'error',
        message: 'Token not provided or Invalid please login first !',
        data: null,
      });
    }
  });
};

export { AuthMiddleWare, AuthMiddleWareIsAdmin, AuthMiddleWareIsBloger };
