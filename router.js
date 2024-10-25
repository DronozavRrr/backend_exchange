import { Router } from "express";
import PairsController from "./PairsController.js";
import UsersController from "./UsersController.js";
import ExchangesController from "./ExchangesController.js";
import { authMiddleware, adminMiddleware } from "./authMiddleware.js"; 
import AuthController from './authController.js';
import { body } from 'express-validator';

const supportedCryptos = ['BTC', 'ETH', 'LTC', 'BNB', 'XRP', 'ADA','USDT','SOL'];


const router = new Router();

router.post(
    '/pair',
    authMiddleware,
    adminMiddleware,
    body('first_crypto').custom(value => {
        if (!supportedCryptos.includes(value)) {
            throw new Error('Первая криптовалюта не поддерживается в настоящее время');
        }
        return true;
    }),
    body('second_crypto').custom(value => {
        if (!supportedCryptos.includes(value)) {
            throw new Error('Вторая криптовалюта не поддерживается в настоящее время');
        }
        return true;
    }),
    body('course').custom(value =>
    {
        if(value <= 0) throw new Error('Курс не может быть меньше или равен нулю');
        return true;
    }),
    
    PairsController.create
);
router.get('/pairs', authMiddleware, PairsController.getAll);
router.get('/pair/id/:id', authMiddleware, PairsController.getOneId);
router.get('/pair/name/:name',authMiddleware, PairsController.getOneName);
router.put(
    '/pair',
     authMiddleware, 
     adminMiddleware,
     body('first_crypto').custom(value => {
        if (!supportedCryptos.includes(value)) {
            throw new Error('Первая криптовалюта не поддерживается в настоящее время');
        }
        return true;
    }),
    body('second_crypto').custom(value => {
        if (!supportedCryptos.includes(value)) {
            throw new Error('Вторая криптовалюта не поддерживается в настоящее время');
        }
        return true;
    }),
    body('course').custom(value =>
        {
            if(value <= 0) throw new Error('Курс не может быть меньше или равен нулю');
            return true;
        }),
     PairsController.update); 
router.delete('/pair/id/:id', authMiddleware, adminMiddleware, PairsController.deleteId);
router.delete('/pair/name/:name',authMiddleware,adminMiddleware, PairsController.deleteName);


router.post('/exchange',authMiddleware, ExchangesController.create);
router.get('/exchanges', ExchangesController.getAll);
router.get('/exchange/id/:id', ExchangesController.getOneId);
router.put('/exchange', authMiddleware, adminMiddleware, ExchangesController.update);
router.delete('/exchange/id/:id', authMiddleware, adminMiddleware, ExchangesController.deleteId);

router.post(
    '/user',
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум 6 символов'),
    UsersController.create
);
router.get('/users', authMiddleware, adminMiddleware, UsersController.getAll);
router.get('/user/:id', authMiddleware, adminMiddleware,UsersController.getOne);
router.put(
    '/user', 
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум 6 символов'),
    authMiddleware, adminMiddleware, 
    UsersController.update);
router.delete('/user/:id', authMiddleware, adminMiddleware, UsersController.deleteId);



router.post('/login', AuthController.login);

export default router;
