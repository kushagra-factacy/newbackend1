import { Router } from "express";
import {grootsearch, hellosolr,factacy_patent} from '../controllers/solr.controller.js'


const router = new Router ; 
router.route('/factacy_patent').get(factacy_patent)
router.route('/hellosolr').get(hellosolr)
router.route('/grootsearch').get(grootsearch)

export default router