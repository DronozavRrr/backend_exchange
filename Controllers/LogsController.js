// Controllers/LogsController.js
import Log from "../Entitys/logs.js";

class LogsController {
  // Создание лога
  async create(req, res) {
    try {
      const { action, details } = req.body;

      if (!action) {
        return res.status(400).json({ message: 'Действие обязательно для логирования.' });
      }

      const log = new Log({
        userId: req.user.id, // Предполагается, что `req.user` заполнен мидлваром аутентификации
        action,
        details
      });

      await log.save();
      res.status(201).json(log);
    } catch (error) {
      console.error('Ошибка при создании лога:', error);
      res.status(500).json({ message: 'Внутренняя ошибка сервера.' });
    }
  }

  // Получение логов (только для администраторов)
  async getAll(req, res) {
    try {
      const { userId, action, dateFrom, dateTo, page = 1, limit = 50 } = req.query;

      const filter = {};

      if (userId) filter.userId = userId;
      if (action) filter.action = { $regex: action, $options: 'i' };
      if (dateFrom || dateTo) {
        filter.timestamp = {};
        if (dateFrom) filter.timestamp.$gte = new Date(dateFrom);
        if (dateTo) filter.timestamp.$lte = new Date(dateTo);
      }

      const logs = await Log.find(filter)
        .populate('userId', 'email') // Для отображения email пользователя
        .sort({ timestamp: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const total = await Log.countDocuments(filter);

      res.json({
        logs,
        total,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    } catch (error) {
      console.error('Ошибка при получении логов:', error);
      res.status(500).json({ message: 'Внутренняя ошибка сервера.' });
    }
  }
}

export default new LogsController();
