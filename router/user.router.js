
import { Router } from 'express';
import { isignup, tsignup, tlogin, ilogin } from '../controllers/user.controller.js';

const router = Router();

router.route('/isignup').post(isignup);
router.route('/tsignup').post(tsignup);
router.route('/tlogin').post(tlogin);
router.route('/ilogin').post(ilogin);

export default router;