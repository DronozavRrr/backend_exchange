import { Router } from "express";
import PairsController from "./PairsController.js";

const router = new Router()

router.post('/pair',PairsController.create)
router.get('/pairs')
router.get('/pair/:id')
router.get('/pair/:first_crypto')
router.put('/pair')
router.delete('/pair/:id')
router.delete('/pair/:first_crypto')

export default router