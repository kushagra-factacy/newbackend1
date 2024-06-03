import {Router} from "express";
import {fetchFile ,sectorfile,confirmsector} from "../controllers/blob.controller.js"

const router = Router();



router.route('/fetchFile').get(fetchFile)
router.route('/sectorfile').get(sectorfile)
router.route('/confirmsector').get(confirmsector)


export default router 
