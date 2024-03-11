

import { Router } from "express";
import { industrial_portfolio, main_sector, cnews ,getarts,funding,news_intel,news,getids} from "../controllers/cdb.controller.js";

const router = Router();

router.route('/industrial_portfolio').get(industrial_portfolio);

router.route('/main_sector').get(main_sector);

router.route('/cnews').get(cnews);

router.route('/getarts').get(getarts);

router.route('/funding').get(funding);


router.route('/news_intel').get(news_intel);

router.route('/news').get(news);
router.route('/getids').get(getids);
export default router;