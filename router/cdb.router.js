

import { Router } from "express";
import {deal,deal30, deal60, deal90, industrial_portfolio, main_sector} from "../controllers/cdb.controller.js";

const router = Router();

router.route('/industrial_portfolio').get(industrial_portfolio);

router.route('/deal').get(deal);

router.route ('/deal30').get(deal30);

router.route('/deal60').get(deal60);

router.route('/deal90').get(deal90);

router.route('/main_sector').get(main_sector);
export default router;