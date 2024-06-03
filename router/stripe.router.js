
import {Router} from "express" ;


import { newstripe,webhook} from '../controllers/stripe.controller.js'
const router = Router();

router.route('/newstripe').get(newstripe)

router.route('/webhook').post(webhook)

export default router