import { Router } from "express";
import {fin} from "../controllers/financial.controller.js";

const router = Router();

router.route('/fin').get(fin);


export default router;