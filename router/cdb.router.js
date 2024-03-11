

import { Router } from "express";
import { industrial_portfolio, main_sector, cnews ,getarts,funding} from "../controllers/cdb.controller.js";

const router = Router();

router.route('/industrial_portfolio').get(industrial_portfolio);

router.route('/main_sector').get(main_sector);

router.route('/cnews').get(cnews);

router.route('/getarts').get(getarts);

router.route('/funding').get(funding);

export default router;