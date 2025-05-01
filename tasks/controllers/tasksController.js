const bcrypt = require('bcrypt');
const { Task } = require('../models/tasks');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ------------------------------------------ TASKS ------------------------------------------ //

exports.create = async (req, res) => {
    try {
        const { name, description, users, attachments, startAt, endAt, priority, state } = req.body;

        // Date check
        const start = new Date(startAt);
        const end = new Date(endAt);
        if (isNaN(start) || isNaN(end))
            return res.status(400).json({ message: 'Неверный формат даты.' });
        if (start >= end)
            return res.status(400).json({ message: 'Дата начала должна быть раньше даты окончания.' });

        const task = await Task.create({
            name,
            description,
            users: !users || users.length === 0 ? null : users,
            attachments,
            startAt,
            endAt,
            priority,
            state
        });
      
        res.status(201).json({
            message: 'Задача создана',
            task: task
        });
    } catch(error) {
        console.error('Ошибка создания задания:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.get = async (req, res) => {
    try {
        const tasks = await Task.findAll();

        res.status(200).json({
            message: 'Список задач',
            tasks: tasks,
        });
    } catch(error) {
        console.error('Ошибка получения списка задач:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.getById = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId)
        return res.status(400).json({ message: 'Не указан id задачи.' });

    try {
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        res.status(200).json(task);
    } catch(error) {
        console.error('Ошибка получения спис:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.change = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId)
        return res.status(400).json({ message: 'Не указан id задачи.' });
    
    try {
        const { name, description } = req.body;

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        task.name = name;
        task.description = description;
        await task.save();

        res.status(200).json({
            message: 'Задача изменена',
            task: {
                id: taskId,
                name,
                description
            }
        });
    } catch(error) {
        console.error('Ошибка изменения задания:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.delete = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId)
        return res.status(400).json({ message: 'Не указан id задачи.' });

    try {
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ message: `Задача c id: ${taskId} не найдена.` });
        }

        await Task.destroy({ where: { id: taskId } });

        return res.status(200).json({ message: `Задача с id: ${taskId} успешно удалена.` });
    } catch(error) {
        console.error('Ошибка получения спис:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

// ------------------------------------------ TASKS CHANGE ------------------------------------------ //

exports.changeState = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId)
        return res.status(400).json({ message: 'Не указан id задачи.' });

    try {
        const { state } = req.body;

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        task.state = state;
        await task.save();

        res.status(200).json({
            message: 'Статус задачи изменен',
            task: {
                id: task.id,
                state: task.state
            }
        });
    } catch(error) {
        console.error('Ошибка изменения статуса задания:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.changePriority = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId)
        return res.status(400).json({ message: 'Не указан id задачи.' });

    try {
        const { priority } = req.body;

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        task.priority = priority;
        await task.save();

        res.status(200).json({
            message: 'Приоритет задачи изменен',
            task: {
                id: task.id,
                priority: task.priority
            }
        });
    } catch(error) {
        console.error('Ошибка изменения приоритета задания:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.changeDate = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId)
        return res.status(400).json({ message: 'Не указан id задачи.' });

    try {
        const { startAt, endAt } = req.body;

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        // Date check
        const start = new Date(startAt);
        const end = new Date(endAt);
        if (isNaN(start) || isNaN(end))
            return res.status(400).json({ message: 'Неверный формат даты.' });
        if (start >= end)
            return res.status(400).json({ message: 'Дата начала должна быть раньше даты окончания.' });


        task.startAt = startAt;
        task.endAt = endAt;
        await task.save();

        res.status(200).json({
            message: 'Даты задачи изменен',
            task: {
                id: task.id,
                startAt: task.startAt,
                endAt: task.endAt
            }
        });
    } catch(error) {
        console.error('Ошибка изменения дат задания:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

// ------------------------------------------ TASKS FILES ------------------------------------------ //

exports.attachFile = async (req, res) => {

}

exports.deleteFile = async (req, res) => {

}

// ------------------------------------------ TASKS USERS ------------------------------------------ //

exports.addUsers = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId)
        return res.status(400).json({ message: 'Не указан id задачи.' });

    try {
        const { users } = req.body;

        if (!Array.isArray(users)) {
            return res.status(400).json({ message: 'Поле users должно быть массивом.' });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        const currentUsers = Array.isArray(task.users) ? task.users : [];
        const newUsers = [...new Set([...currentUsers, ...users])];
        task.users = newUsers;
        await task.save();

        res.status(200).json({
            message: 'Состав задачи изменен',
            task: {
                id: task.id,
                users: task.users
            }
        });
    } catch(error) {
        console.error('Ошибка изменения состава задания:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.deleteUsers = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId)
        return res.status(400).json({ message: 'Не указан id задачи.' });

    try {
        const { users } = req.body;

        if (!Array.isArray(users)) {
            return res.status(400).json({ message: 'Поле users должно быть массивом.' });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        const currentUsers = Array.isArray(task.users) ? task.users : [];
        const updatedUsers = currentUsers.filter(id => !users.includes(id));
        task.users = updatedUsers;
        await task.save();

        res.status(200).json({
            message: 'Состав задачи изменен',
            task: {
                id: task.id,
                users: task.users
            }
        });
    } catch(error) {
        console.error('Ошибка изменения состава задания:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

// -------------------------- Additional functions -------------------------- //

async function validateUsers(users) {
    const gatewayURL = process.env.GATEWAY_URL || "http://localhost";
    const res = await axios.post(`${gatewayURL}/users/exists`, { ids: users });
    return res.data;
}