const { State } = require('../models/state');
require('dotenv').config();
const { info, warn, error: errlog } = require('./../kafka/logger');

exports.add = async (req, res) => {
    try {
        const { RU, EN } = req.body;

        if (!RU) {
            warn('Не указано название статуса на русском языке.');
            return res.status(400).json({ message: 'Не указано название статуса на русском языке.' });
        }

        const existing = await State.findOne({ where: { RU, EN } });

        if (existing) {
            warn('Такой статус уже существует.');
            return res.status(400).json({ message: `Такой статус уже существует.` });
        }

        const status = await State.create({
            RU: RU,
            EN: EN
        });
      
        info(`Статус успешно создан! ${status}`);
        res.status(201).json({
            message: 'Статус создан',
            status: status
        });
    } catch(error) {
        console.error('Ошибка добавления статуса:', error);
        errlog(`Ошибка добавления статуса: ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.get = async (req, res) => {
    try {
        const states = await State.findAll();

        if (!states) {
            warn('Статусы не найдены.');
            return res.status(404).json({ message: 'Статусы не найдены.' });
        }

        info(`Статусы успешно получены! ${states}`);
        res.status(200).json({
            states,
        });
    } catch(error) {
        console.error('Ошибка при получении статусов:', error);
        errlog(`Ошибка при получении статусов: ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.delete = async (req, res) => {
    const stateId = req.params.id;
    if (!stateId) {
        warn('Не указан id.');
        return res.status(400).json({ message: 'Не указан id.' });
    }

    try {
        const status = await State.findOne({ where: { stateId } });

        if (!status) {
            warn(`Статуса с id: ${stateId} не существует.`);
            return res.status(400).json({ message: `Статуса с таким id: ${stateId} не существует.` });
        }

        await State.destroy({ where: { id: stateId } });

        info(`Статус с id: ${stateId} успешно удалён!`);
        res.status(200).json({ message: `Статус с id: ${stateId} успешно удалён.` });
    } catch(error) {
        console.error('Ошибка при удалении статуса:', error);
        errlog(`Ошибка при удалении статуса: ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}