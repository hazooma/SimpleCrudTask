import { config } from 'dotenv';
import JWTR from 'jwt-redis';
import redis from 'redis';

const redisClient = redis.createClient(6379, 'redis');
const jwtr = new JWTR(redisClient);
config();

const AuthMiddleWare = (req, res, next) => {
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
      // add user id to request
      req.body.userId = decoded.user_id;

      next();
    }
  });
};

export { AuthMiddleWare };
