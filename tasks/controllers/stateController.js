const bcrypt = require('bcrypt');
const { State } = require('../models/state');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.add = async (req, res) => {
    try {
        const { RU, EN } = req.body;

        const existing = await State.findOne({ where: { RU, EN } });

        if (existing) {
            return res.status(400).json({ message: `Такой статус уже существует.` });
        }

        const status = await State.create({
            RU: RU,
            EN: EN
        });
      
        res.status(201).json({
            message: 'Статус создан',
            status: status
        });
    } catch(error) {
        console.error('Ошибка добавления статуса:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.get = async (req, res) => {
    try {
        const states = await State.findAll();

        res.status(200).json({
            states,
        });
    } catch(error) {
        console.error('Ошибка при получении статусов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.delete = async (req, res) => {
    const stateId = req.params.id;
    if (!stateId)
        return res.status(400).json({ message: 'Не указан id.' });

    try {
        const status = await State.findOne({ where: { stateId } });

        if (!status) {
            return res.status(400).json({ message: `Статуса с таким id: ${stateId} не существует.` });
        }

        await State.destroy({ where: { id: stateId } });

        res.status(200).json({ message: `Статус с id: ${stateId} успешно удалён.` });
    } catch(error) {
        console.error('Ошибка при удалении статуса:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}