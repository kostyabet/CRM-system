const { Task } = require('../models/tasks');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const { State } = require('../models/state');
const { Priority } = require('../models/priority');
const { v4: uuidv4 } = require('uuid');
const { createResponseWaiter } = require('./../kafka/memory-store');
const { checkUsers } = require('./../kafka/producer');
const { info, error: errlog, warn } = require('./../kafka/logger');

// ------------------------------------------ TASKS ------------------------------------------ //

exports.create = async (req, res) => {
    try {
        const { name, description, startAt, endAt, priority, state } = req.body;
        const attachments = req.files?.map(file => file.path) || null;

        if (!name || !startAt || !endAt || !priority || !state) {
            warn('Не все обязательные поля заполнены.');
            return res.status(400).json({ message: 'Не все обязательные поля заполнены.' });
        }

        // Date check
        const start = new Date(startAt);
        const end = new Date(endAt);
        if (isNaN(start) || isNaN(end)) {
            warn('Неверный формат даты.');
            return res.status(400).json({ message: 'Неверный формат даты.' });
        }
        if (start >= end) {
            warn('Дата начала должна быть раньше даты окончания.');
            return res.status(400).json({ message: 'Дата начала должна быть раньше даты окончания.' });
        }
            
        // Users check
        const users = Array.isArray(req.body.users)
            ? req.body.users
            : [req.body.users];

        if (!users || users.length === 0) {
            warn('Пользователи не указаны.');
            return res.status(400).json({ message: 'Пользователи не указаны.' });
        }

        const correlationId = uuidv4();
        const responsePromise = createResponseWaiter(correlationId);
        await checkUsers(users, correlationId);

        const response = await responsePromise;
        const { exists } = response;

        const task = await Task.create({
            name,
            description,
            users: !exists || exists.length === 0 ? null : exists,
            attachments,
            startAt,
            endAt,
            priority,
            state
        });
      
        info('Задача создана', { taskId: task.id })
        res.status(201).json({
            message: 'Задача создана',
            task: task
        });
    } catch(error) {
        console.error('Ошибка создания задания:', error);
        errlog(`Ошибка создания задания. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.get = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: [
                {
                    model: State,
                    attributes: ['RU', 'EN'],
                },
                {
                    model: Priority,
                    attributes: ['RU', 'EN'],
                },
            ],
        });

        if (!tasks) {
            warn('Задачи не найдены.');
            return res.status(404).json({ message: 'Задачи не найдены.' });
        }

        info('Задачи успешно получены!');
        res.status(200).json({
            message: 'Список задач',
            tasks: tasks,
        });
    } catch(error) {
        console.error('Ошибка получения списка задач:', error);
        errlog(`Ошибка получения списка задач. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.getById = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        warn('Не указан id задачи.');
        return res.status(400).json({ message: 'Не указан id задачи.' });
    }
        
    try {
        const task = await Task.findByPk(taskId, {
            include: [
                {
                    model: State,
                    attributes: ['RU', 'EN'],  // Загружаем только нужные атрибуты
                },
                {
                    model: Priority,
                    attributes: ['RU', 'EN'],  // Загружаем только нужные атрибуты
                },
            ],
        });

        if (!task) {
            warn(`Задача с id: ${taskId} не найдена.`, { taskId});
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        res.status(200).json(task);
    } catch(error) {
        console.error('Ошибка получения списка задач:', error);
        errlog(`Ошибка получения списка задач. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.userTasksById = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        warn('Не указан id пользователя.');
        return res.status(400).json({ message: 'Не указан id пользователя.' });
    }
        
    const correlationId = uuidv4();
    const responsePromise = createResponseWaiter(correlationId);
    await checkUsers([userId], correlationId);

    const response = await responsePromise;
    const { exists } = response;

    if (!exists) {
        warn(`Пользователя с id: ${userId} не существует!`);
        return res.status(400).json({ messaeg: `Пользователя с id: ${userId} не существует!` })
    }
        
    try {
        const tasks = await Task.findAll({
            where: {
                users: {
                    [Sequelize.Op.contains]: [userId]
                }
            },
            include: [
                {
                    model: State,
                    attributes: ['RU', 'EN'],
                },
                {
                    model: Priority,
                    attributes: ['RU', 'EN'],
                },
            ],
        });

        if (!tasks) {
            warn('Задачи не найдены.');
            return res.status(404).json({ message: 'Задачи не найдены.' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Ошибка получения списка задач:', error);
        errlog(`Ошибка получения списка задач. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.change = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        warn('Не указан id задачи.');
        return res.status(400).json({ message: 'Не указан id задачи.' });
    }
        
    try {
        const { name, description, users, startAt, endAt, priority, state } = req.body;

        if (!name || !startAt || !endAt || !priority || !state) {
            warn('Не все обязательные поля заполнены.');
            return res.status(400).json({ message: 'Не все обязательные поля заполнены.' });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            warn(`Задача с id: ${taskId} не найдена.`, { taskId });
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        // Date check
        const start = new Date(startAt);
        const end = new Date(endAt);
        if (isNaN(start) || isNaN(end)) {
            warn('Неверный формат даты.');
            return res.status(400).json({ message: 'Неверный формат даты.' });
        }
        if (start >= end) {
            warn('Дата начала должна быть раньше даты окончания.');
            return res.status(400).json({ message: 'Дата начала должна быть раньше даты окончания.' });
        }

        // Users check
        const correlationId = uuidv4();
        const responsePromise = createResponseWaiter(correlationId);
        await checkUsers(users, correlationId);

        const response = await responsePromise;
        const { exists } = response;

        if (!exists) {
            warn('Ошибка получения пользователей.');
            return res.status(400).json({ message: 'Ошибка получения пользователей.' });
        }
        
        task.name = name;
        task.description = description;
        task.startAt = startAt;
        task.endAt = endAt;
        task.priority = priority;
        task.state = state;
        task.users = exists;
        await task.save();

        info('Задача изменена', { taskId: task.id });
        res.status(200).json({
            message: 'Задача изменена',
            task: task
        });
    } catch(error) {
        console.error('Ошибка изменения задания:', error);
        errlog(`Ошибка изменения задания. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.delete = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        warn('Не указан id задачи.');
        return res.status(400).json({ message: 'Не указан id задачи.' });
    }
        
    try {
        const task = await Task.findByPk(taskId);

        if (!task) {
            warn(`Задача с id: ${taskId} не найдена.`, { taskId });
            return res.status(404).json({ message: `Задача c id: ${taskId} не найдена.` });
        }

        await Task.destroy({ where: { id: taskId } });

        info(`Задача с id: ${taskId} успешно удалена!`, { taskId });
        return res.status(200).json({ message: `Задача с id: ${taskId} успешно удалена.` });
    } catch(error) {
        console.error('Ошибка получения спис:', error);
        errlog(`Ошибка получения списка задач. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.getSummary = async (req, res) => {
    try {
        const allStates = await State.findAll({
            where: {
                EN: { [Sequelize.Op.ne]: 'None' }
            },
            raw: true
        });

        if (!allStates) {
            warn('Состояния не найдены.');
            return res.status(404).json({ message: 'Состояния не найдены.' });
        }
  
        const counts = await Task.findAll({
            attributes: [
                [Sequelize.col('t_state.RU'), 'state'],
                [Sequelize.fn('COUNT', Sequelize.col('t_tasks.id')), 'count']
            ],
            include: [
                {
                    model: State,
                    attributes: [],
                    required: true
                }
            ],
            group: ['t_state.RU'],
            raw: true
        });

        if (!counts) {
            warn('Статистика не найдена.');
            return res.status(404).json({ message: 'Статистика не найдена.' });
        }
  
        const countsMap = new Map();
        counts.forEach(row => countsMap.set(row.state, parseInt(row.count, 10)));
    
        const summary = {};
        allStates.forEach(state => {
            summary[state.RU] = countsMap.get(state.RU) || 0;
        });
        
        info('Статистика получена');
        res.json(summary);
    } catch (error) {
        console.error('Ошибка получения статистики:', error);
        errlog(`Ошибка получения статистики. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// ------------------------------------------ TASKS CHANGE ------------------------------------------ //

exports.changeState = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        warn('Не указан id задачи.');
        return res.status(400).json({ message: 'Не указан id задачи.' });
    }
        
    try {
        const { state } = req.body;

        if (!state) {
            warn('Не указано состояние задачи.');
            return res.status(400).json({ message: 'Не указано состояние задачи.' });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            warn(`Задача с id: ${taskId} не найдена.`, { taskId });
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        task.state = state;
        await task.save();

        info('Статус задачи изменен', { taskId: task.id });
        res.status(200).json({
            message: 'Статус задачи изменен',
            task: {
                id: task.id,
                state: task.state
            }
        });
    } catch(error) {
        console.error('Ошибка изменения статуса задания:', error);
        errlog(`Ошибка изменения статуса задания. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.changePriority = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        warn('Не указан id задачи.');
        return res.status(400).json({ message: 'Не указан id задачи.' });
    }
        
    try {
        const { priority } = req.body;
        
        if (!priority) {
            warn('Не указан приоритет задачи.');
            return res.status(400).json({ message: 'Не указан приоритет задачи.' });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            warn(`Задача с id: ${taskId} не найдена.`, { taskId });
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        task.priority = priority;
        await task.save();

        info('Приоритет задачи изменен', { taskId: task.id });
        res.status(200).json({
            message: 'Приоритет задачи изменен',
            task: {
                id: task.id,
                priority: task.priority
            }
        });
    } catch(error) {
        console.error('Ошибка изменения приоритета задания:', error);
        errlog(`Ошибка изменения приоритета задания. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.changeDate = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        warn('Не указан id задачи.');
        return res.status(400).json({ message: 'Не указан id задачи.' });
    }

    try {
        const { startAt, endAt } = req.body;

        if (!startAt || !endAt) {
            warn('Не указаны даты задачи.');
            return res.status(400).json({ message: 'Не указаны даты задачи.' });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            warn(`Задача с id: ${taskId} не найдена.`, { taskId });
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        // Date check
        const start = new Date(startAt);
        const end = new Date(endAt);
        if (isNaN(start) || isNaN(end)) {
            warn('Неверный формат даты.');
            return res.status(400).json({ message: 'Неверный формат даты.' });
        }
        if (start >= end) {
            warn('Дата начала должна быть раньше даты окончания.');
            return res.status(400).json({ message: 'Дата начала должна быть раньше даты окончания.' });
        }

        task.startAt = startAt;
        task.endAt = endAt;
        await task.save();

        info('Даты задачи изменены', { taskId: task.id });
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
        errlog(`Ошибка изменения дат задания. ${error}`);
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
    if (!taskId) {
        warn('Не указан id задачи.');
        return res.status(400).json({ message: 'Не указан id задачи.' });
    }

    try {
        const { users } = req.body;

        if (!Array.isArray(users)) {
            warn('Поле users должно быть массивом.');
            return res.status(400).json({ message: 'Поле users должно быть массивом.' });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            warn(`Задача с id: ${taskId} не найдена.`, { taskId });
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        const correlationId = uuidv4();
        const responsePromise = createResponseWaiter(correlationId);
        await checkUsers(users, correlationId);

        const response = await responsePromise;
        const { exists } = response;

        if (!exists) {
            warn('Ошибка получения пользователей.');
            return res.status(400).json({ message: 'Ошибка получения пользователей.' });
        }

        const currentUsers = Array.isArray(task.users) ? task.users : [];
        const newUsers = [...new Set([...currentUsers, ...exists])];
        task.users = newUsers;
        await task.save();

        info('Состав задачи изменен', { taskId: task.id });
        res.status(200).json({
            message: 'Состав задачи изменен!',
            task: {
                id: task.id,
                users: task.users
            }
        });
    } catch(error) {
        console.error('Ошибка изменения состава задания:', error);
        errlog(`Ошибка изменения состава задания. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.deleteUsers = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        warn('Не указан id задачи.');
        return res.status(400).json({ message: 'Не указан id задачи.' });
    }

    try {
        const { users } = req.body;

        if (!Array.isArray(users)) {
            warn('Поле users должно быть массивом.');
            return res.status(400).json({ message: 'Поле users должно быть массивом.' });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            warn(`Задача с id: ${taskId} не найдена.`, { taskId });
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        const correlationId = uuidv4();
        const responsePromise = createResponseWaiter(correlationId);
        await checkUsers(users, correlationId);

        const response = await responsePromise;
        const { exists } = response;
        
        if (!exists) {
            warn('Ошибка получения пользователей.');
            return res.status(400).json({ message: 'Ошибка получения пользователей.' });
        }
        
        const currentUsers = Array.isArray(task.users) ? task.users : [];
        const updatedUsers = currentUsers.filter(id => !exists.includes(id));
        task.users = updatedUsers;
        await task.save();

        info('Состав задачи изменен', { taskId: task.id });
        res.status(200).json({
            message: 'Состав задачи изменен',
            task: {
                id: task.id,
                users: task.users
            }
        });
    } catch(error) {
        console.error('Ошибка изменения состава задания:', error);
        errlog(`Ошибка изменения состава задания. ${error}`);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}