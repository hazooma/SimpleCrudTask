import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const AuthMiddleWare = (req, res, next) => {
  if (!req.headers['x-access-token']) {
    res.json({
      status: 'error',
      message: 'Token not provided please login first !',
      data: null,
    });
  }

  jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.json({
        status: 'error',
        message: 'Your token is not valid ,Login again !',
        data: null,
      });
    } else {
      // add user id to request
      req.body.userId = decoded.user_id;
      req.body.roleId = decoded.role_id;

      next();
    }
  });
};

export { AuthMiddleWare };
