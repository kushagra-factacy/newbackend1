import { Router } from "express";


import { summary_search,daily_summary} from '../controllers/groot.controller.js'


const router = Router();

router.route('/summary_search').get(summary_search)

router.route('/daily_summary').get(daily_summary)

export default router ;