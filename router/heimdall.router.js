import { Router } from "express";
import {comp, deal, deal30, deal60, deal90 ,trending, patents} from "../controllers/heimdall.controller.js";

const router = Router();

router.route('/comp').get(comp);



router.route('/deal').get(deal);

router.route ('/deal30').get(deal30);

router.route('/deal60').get(deal60);

router.route('/deal90').get(deal90);

router.route('/trending').get(trending);

router.route('/patents').get(patents);


export default router;