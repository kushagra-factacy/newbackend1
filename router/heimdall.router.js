import { Router } from "express";
import {comp, deal, deal30, deal60, deal90 ,trending, patents,seed_information,investor_alt,seed_info_detail, person_id,investor} from "../controllers/heimdall.controller.js";

const router = Router();

router.route('/comp').get(comp);

router.route('/deal').get(deal);

router.route ('/deal30').get(deal30);

router.route('/deal60').get(deal60);

router.route('/deal90').get(deal90);

router.route('/trending').get(trending);

router.route('/patents').get(patents);

router.route('/seed_information').get(seed_information);

router.route('/investor_alt').get(investor_alt);

router.route('/seed_info_detail').get(seed_info_detail);

router.route('/investor').get(investor);

router.route('/person_id').get(person_id);




export default router;
