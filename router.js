// router.js
import { Router } from "express";
import PairsController from "./Controllers/PairsController.js";
import UsersController from "./Controllers/UsersController.js";
import BidsController from "./Controllers/BidsController.js";
import ExchangesController from "./Controllers/ExchangesController.js";
import LogsController from "./Controllers/LogsController.js"; // Импорт контроллера логов
import AuthController from './Controllers/authController.js';
import { authMiddleware, adminMiddleware } from "./Middleware/authMiddleware.js"; 
import { body } from 'express-validator';

const supportedCryptos = ['BTC', 'ETH', 'LTC', 'BNB', 'XRP', 'ADA','USDT','SOL','RUB'];

const router = new Router();

// Маршруты для пар (pairs) — как у вас уже есть
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
    body('type_first_crypto').custom(value =>
    {
        if(!["fiat","crypto"].includes(value)) throw new Error('Тип может быть либо фиатом, либо криптовалютой');
        return true;
    }),
    body('type_second_crypto').custom(value =>
     {
            if(!["fiat","crypto"].includes(value)) throw new Error('Тип может быть либо фиатом, либо криптовалютой');
        return true;
    }),
    
    (req,res) => PairsController.create(req, res) 
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
        (req,res) => PairsController.update(req, res) ); 
router.delete('/pair/id/:id', authMiddleware, adminMiddleware, PairsController.deleteId);
router.delete('/pair/name/:name',authMiddleware,adminMiddleware, PairsController.deleteName);

// Маршруты для обменов (exchanges)
router.post('/exchange', authMiddleware, ExchangesController.create);
router.get('/exchanges', ExchangesController.getAll);
router.get('/exchange/id/:id', ExchangesController.getOneId);
router.put('/exchange', authMiddleware, adminMiddleware, ExchangesController.update);
router.delete('/exchange/id/:id', authMiddleware, adminMiddleware, ExchangesController.deleteId);

// Маршруты для пользователей (users)
router.post(
    '/user',
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум 6 символов'),
    (req,res) => UsersController.create(req,res)
);
router.get('/user/profile',authMiddleware, (req, res) => UsersController.getProfile(req,res));
router.get('/users', authMiddleware, adminMiddleware, UsersController.getAll);
router.get('/user/:id', authMiddleware, adminMiddleware,UsersController.getOne);
router.put(
    '/user', 
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум 6 символов'),
    authMiddleware, adminMiddleware, 
    (req,res) => UsersController.update(req,res));
router.delete('/user/:id', authMiddleware, adminMiddleware, UsersController.deleteId);

// Маршруты для заявок (bids)
router.post('/bid', authMiddleware, (req, res) => BidsController.create(req, res));
router.get('/bids', authMiddleware, (req, res) => BidsController.getAll(req, res));
router.get('/bid/id/:id', authMiddleware, (req, res) => BidsController.getOneId(req, res));
router.put('/bid', authMiddleware, adminMiddleware, (req, res) => BidsController.update(req, res));
router.delete('/bid/id/:id', authMiddleware,adminMiddleware, (req, res) => BidsController.deleteId(req, res));

// Маршруты для логов
router.post('/logs', authMiddleware, adminMiddleware, (req, res) => LogsController.create(req, res));
router.get('/logs', authMiddleware, adminMiddleware, (req, res) => LogsController.getAll(req, res));

// Маршрут для аутентификации
router.post('/login', AuthController.login);


// router.js (дополнение)
router.post('/logs', authMiddleware, adminMiddleware, (req, res) => LogsController.create(req, res));
router.get('/logs', authMiddleware, adminMiddleware, (req, res) => LogsController.getAll(req, res));


export default router;
