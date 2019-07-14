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
      console.log('exists');
    } else {
      res.json({
        status: 'error',
        message: 'Token not provided please login first !',
        data: null,
      });
      console.log("doesn't exist");
    }
  });
};

const AuthMiddleWareIsBloger = (req, res, next) => {
  if (!req.headers['x-access-token']) {
    res.json({
      status: 'error',
      message: 'Token not provided please login first !',
      data: null,
    });
  }

  jwtr.verify(req.headers['x-access-token'], process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.json({
        status: 'error',
        message: 'Your token is not valid ,Login again !',
        data: null,
      });
    } else {
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

          next();
        }
      });
    }
  });
};

const AuthMiddleWareIsAdmin = (req, res, next) => {
  if (!req.headers['x-access-token']) {
    res.json({
      status: 'error',
      message: 'Token not provided please login first !',
      data: null,
    });
  }

  jwtr.verify(req.headers['x-access-token'], process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.json({
        status: 'error',
        message: 'Your token is not valid ,Login again !',
        data: null,
      });
    } else {
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

          next();
        }
      });
    }
  });
};
export { AuthMiddleWare, AuthMiddleWareIsAdmin, AuthMiddleWareIsBloger };
