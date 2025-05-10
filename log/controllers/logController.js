require('dotenv').config();
const { log } = require('./../kafka/logger');

exports.setNewLog = async (req, res) => {
    try {
        const { level = 'INFO', message, service = 'frontend', extra } = req.body;
        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }
        log(service, level, message, extra);
        res.status(200).send('Logged');
    } catch (error) {
        console.error('Ошибка при логировании:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}