const { Priority } = require('../models/priority');
require('dotenv').config();
const { info, warn, error: errlog } = require('./../kafka/logger');

exports.add = async (req, res) => {
    try {
        const { RU, EN } = req.body;

        if (!RU) {
            warn('Не указано название сложности на русском языке.');
            return res.status(400).json({ message: 'Не указано название сложности на русском языке.' });
        }

        const existing = await Priority.findOne({ where: { RU, EN } });

        if (existing) {
            warn('Такая "сложность" уже существует.');
            return res.status(400).json({ message: `Такая "сложность" уже существует.` });
        }

        const priority = await Priority.create({
            RU: RU,
            EN: EN
        });
      
        info(`Сложность успешно создана! ${priority}`);
        res.status(201).json({
            message: 'Сложность создана',
            priority: priority
        });
    } catch(error) {
        console.error('Ошибка добавления сложности:', error);
        errlog('Ошибка добавления сложности:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.get = async (req, res) => {
    try {
        const priorities = await Priority.findAll();

        if (!priorities || priorities.length === 0) {
            warn('Сложности не найдены.');
            return res.status(404).json({ message: 'Сложности не найдены.' });
        }

        info(`Сложности успешно получены! ${priorities}`);
        res.status(200).json({
            priorities,
        });
    } catch(error) {
        console.error('Ошибка при получении сложностей:', error);
        errlog(`Ошибка при получении сложностей: ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.delete = async (req, res) => {
    const priorityId = req.params.id;
    if (!priorityId) {
        warn('Не указан id.');
        return res.status(400).json({ message: 'Не указан id.' });
    }

    try {
        const priority = await Priority.findOne({ where: { priorityId } });

        if (!priority) {
            warn(`Сложность с id: ${priorityId} не найдена.`);
            return res.status(400).json({ message: `Сложность с таким id: ${priorityId} не существует.` });
        }

        await Priority.destroy({ where: { id: priorityId } });

        info(`Сложность с id: ${priorityId} успешно удалена.`);
        return res.status(200).json({ message: `Сложнось с id: ${priorityId} успешно удалена.` });
    } catch(error) {
        console.error('Ошибка при удалении сложности:', error);
        errlog(`Ошибка при удалении сложности: ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}