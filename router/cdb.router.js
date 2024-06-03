import { Router } from "express";
import { industrial_portfolio, main_sector, cnews ,getarts,funding,news_intel,news,getids,mca_cin_info,patentsearch,business_id,inv_regist,i_regist,proposed_investor,investor_download,inv_login ,inv_user_detail,confirm_user,user_final, testRoute} from "../controllers/cdb.controller.js";

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

router.route('/proposed_investor').get(proposed_investor);

router.route('/investor_download').get(investor_download);

router.route('/inv_regist').post(inv_regist);

router.route('/i_regist').post(i_regist)

router.route('/inv_login').post(inv_login);

router.route('/inv_user_detail').get(inv_user_detail);

router.route('/confirm_user').post(confirm_user);

router.route('/user_final').get(user_final);

router.route('/testRoute').get(testRoute)

export default router;
