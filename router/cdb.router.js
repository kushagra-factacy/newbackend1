

import { Router } from "express";
import { industrial_portfolio, main_sector, cnews } from "../controllers/cdb.controller.js";

const router = Router();

router.route('/industrial_portfolio').get(industrial_portfolio);

router.route('/main_sector').get(main_sector);

router.route('/cnews').get(cnews);
export default router;