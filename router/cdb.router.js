

import { Router } from "express";
import { industrial_portfolio, main_sector, cnews ,getarts,funding,news_intel,news,getids,mca_cin_info,patentsearch,business_id} from "../controllers/cdb.controller.js";

const router = Router();

router.route('/industrial_portfolio').get(industrial_portfolio);

router.route('/main_sector').get(main_sector);

router.route('/cnews').get(cnews);

router.route('/getarts').get(getarts);

router.route('/funding').get(funding);

router.route('/news_intel').get(news_intel);

router.route('/news').get(news);

router.route('/getids').get(getids);

router.route('/mca_cin_info').get(mca_cin_info);

router.route('/patentsearch').get(patentsearch);

router.route('/business_id').get(business_id);
export default router;