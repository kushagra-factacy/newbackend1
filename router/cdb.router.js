

import { Router } from "express";
import {industrial_portfolio} from "../controllers/cdb.controller.js";

const router = Router();

router.route('/industrial_portfolio').get(industrial_portfolio);


export default router;