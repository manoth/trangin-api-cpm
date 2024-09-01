'use strict';

import * as express from 'express';
const router = express.Router();
import member from './member';
import inventory from './inventory';

const jwtVerify = (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      req.token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      req.token = req.query.token;
    }
    req.decoded = req.jwt.verify(req.token);
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'Token not validated.' });
  }
}

router.use('/member', member);
router.use('/inventory', jwtVerify, inventory);

router.get('/', (req, res, next) => {
  res.json({ message: 'Hello World!' });
});

export default router;