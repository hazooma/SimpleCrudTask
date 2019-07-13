import jwt from 'jsonwebtoken';

const AuthMiddleWare = (req, res, next) => {
  if (!req.headers['x-access-token']) {
    res.json({
      status: 'error',
      message: 'Token not provided please login first !',
      data: null,
    });
  }

  jwt.verify(req.headers['x-access-token'], 'secretkey', (err, decoded) => {
    if (err) {
      res.json({
        status: 'error',
        message: 'Your token is not valid ,Login again !',
        data: null,
      });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      req.body.role = decoded.role;

      next();
    }
  });
};

export { AuthMiddleWare };
