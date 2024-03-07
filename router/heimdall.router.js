import { Router } from "express";
import {comp} from "../controllers/heimdall.controller.js";

const router = Router();

router.route('/comp').get(comp);

export default router;



