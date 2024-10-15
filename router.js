import { Router } from "express";
import PairsController from "./PairsController.js";
import UsersController from "./UsersController.js";

const router = new Router();

router.post('/pair', PairsController.create);
router.get('/pairs', PairsController.getAll);


router.get('/pair/id/:id', PairsController.getOneId);

router.get('/pair/name/:name', PairsController.getOneName);

router.put('/pair', PairsController.update);
router.delete('/pair/id/:id', PairsController.deleteId);
router.delete('/pair/name/:name', PairsController.deleteName);




router.post('/user',UsersController.create)
router.get('/users',UsersController.getAll)

export default router;
