





import { Router } from 'express';
import { inv_signup, tsignup, tlogin, inv_login } from '../controllers/user.controller.js';

const router = Router();

router.route('/inv_signup').post(inv_signup);
router.route('/tsignup').post(tsignup);
router.route('/tlogin').post(tlogin);
router.route('/inv_login').post(inv_login);

export default router;