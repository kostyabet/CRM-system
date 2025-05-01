const bcrypt = require('bcrypt');
const { Priority } = require('../models/priority');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.add = async (req, res) => {
    try {
        const { RU, EN } = req.body;

        const existing = await Priority.findOne({ where: { RU, EN } });

        if (existing) {
            return res.status(400).json({ message: `Такая "сложность" уже существует.` });
        }

        const priority = await Priority.create({
            RU: RU,
            EN: EN
        });
      
        res.status(201).json({
            message: 'Сложность создана',
            priority: priority
        });
    } catch(error) {
        console.error('Ошибка добавления сложности:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.get = async (req, res) => {
    try {
        const priorities = await Priority.findAll();

        res.status(200).json({
            priorities,
        });
    } catch(error) {
        console.error('Ошибка при получении сложностей:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.delete = async (req, res) => {
    const priorityId = req.params.id;
    if (!priorityId)
        return res.status(400).json({ message: 'Не указан id.' });

    try {
        const priority = await Priority.findOne({ where: { priorityId } });

        if (!priority) {
            return res.status(400).json({ message: `Сложность с таким id: ${priorityId} не существует.` });
        }

        await Priority.destroy({ where: { id: priorityId } });

        return res.status(200).json({ message: `Сложнось с id: ${priorityId} успешно удалена.` });
    } catch(error) {
        console.error('Ошибка при удалении сложности:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}