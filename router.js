import { Router } from "express";
import PairsController from "./PairsController.js";
import UsersController from "./UsersController.js";
import ExchangesController from "./ExchangesController.js";
import { authMiddleware, adminMiddleware } from "./authMiddleware.js"; 
import AuthController from './authController.js';



const router = new Router();

router.post('/pair', authMiddleware, adminMiddleware, PairsController.create);
router.get('/pairs', PairsController.getAll);
router.get('/pair/id/:id', PairsController.getOneId);
router.get('/pair/name/:name', PairsController.getOneName);
router.put('/pair', authMiddleware, adminMiddleware, PairsController.update); 
router.delete('/pair/id/:id', authMiddleware, adminMiddleware, PairsController.deleteId);
router.delete('/pair/name/:name',authMiddleware,adminMiddleware, PairsController.deleteName);


router.post('/exchange', ExchangesController.create);
router.get('/exchanges', ExchangesController.getAll);
router.get('/exchange/id/:id', ExchangesController.getOneId);
router.put('/exchange', ExchangesController.update);
router.delete('/exchange/id/:id', ExchangesController.deleteId);

router.post('/user', UsersController.create);
router.get('/users', UsersController.getAll);
router.get('/user/:id', UsersController.getOne);
router.put('/user', UsersController.update);
router.delete('/user/:id', UsersController.deleteId);



router.post('/login', AuthController.login);

export default router;
