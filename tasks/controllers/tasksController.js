const bcrypt = require('bcrypt');
const { Task } = require('../models/tasks');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require('axios');
const { Sequelize } = require('sequelize');
const { State } = require('../models/state');
const { Priority } = require('../models/priority');
const { v4: uuidv4 } = require('uuid');
const { createResponseWaiter } = require('./../kafka/memory-store');
const { checkUsers } = require('./../kafka/producer');

// ------------------------------------------ TASKS ------------------------------------------ //

exports.create = async (req, res) => {
    try {
        const { name, description, startAt, endAt, priority, state } = req.body;
        const attachments = req.files?.map(file => file.path) || null;

        // Date check
        const start = new Date(startAt);
        const end = new Date(endAt);
        if (isNaN(start) || isNaN(end))
            return res.status(400).json({ message: 'Неверный формат даты.' });
        if (start >= end)
            return res.status(400).json({ message: 'Дата начала должна быть раньше даты окончания.' });

        // Users check
        const users = Array.isArray(req.body.users)
            ? req.body.users
            : [req.body.users];

        const correlationId = uuidv4();
        const responsePromise = createResponseWaiter(correlationId);
        await checkUsers(users, correlationId);

        const response = await responsePromise;
        const { exists } = response;

        console.log(exists, 'exists');

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
            return res.status(404).json({ message: 'Задача не найдена.' });
        }

        res.status(200).json(task);
    } catch(error) {
        console.error('Ошибка получения списка задач:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}

exports.userTasksById = async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        return res.status(400).json({ message: 'Не указан id пользователя.' });

    const correlationId = uuidv4();
    const responsePromise = createResponseWaiter(correlationId);
    await checkUsers([userId], correlationId);

    const response = await responsePromise;
    const { exists } = response;
    console.log(exists, 'exists');

    if (!exists)
        return res.status(400).json({ messaeg: `Пользователя с id: ${userId} не существует!` })

    try {
        const tasks = await Task.findAll({
            where: {
                users: {
                    [Sequelize.Op.contains]: [userId] // Check if userId is in the users array
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

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Ошибка получения списка задач:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
}


exports.change = async (req, res) => {
    const taskId = req.params.id;
    if (!taskId)
        return res.status(400).json({ message: 'Не указан id задачи.' });
    
    try {
        const { name, description, users, startAt, endAt, priority, state } = req.body;

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

        // Users check
        const correlationId = uuidv4();
        const responsePromise = createResponseWaiter(correlationId);
        await checkUsers(users, correlationId);

        const response = await responsePromise;
        const { exists } = response;
        console.log(exists, 'exists');

        task.name = name;
        task.description = description;
        task.startAt = startAt;
        task.endAt = endAt;
        task.priority = priority;
        task.state = state;
        task.users = exists;
        await task.save();

        res.status(200).json({
            message: 'Задача изменена',
            task: task
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

exports.getSummary = async (req, res) => {
    try {
      // Получаем все состояния, кроме "Не выбрано"
      const allStates = await State.findAll({
        where: {
          EN: { [Sequelize.Op.ne]: 'None' } // исключаем "None" (или 'Не выбрано')
        },
        raw: true
      });
  
      // Получаем реальные количества задач по состояниям
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
  
      // Преобразуем counts в Map для удобства
      const countsMap = new Map();
      counts.forEach(row => countsMap.set(row.state, parseInt(row.count, 10)));
  
      // Собираем итоговый объект
      const summary = {};
      allStates.forEach(state => {
        summary[state.RU] = countsMap.get(state.RU) || 0;
      });
  
      res.json(summary);
    } catch (error) {
      console.error('Ошибка получения статистики:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
};

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

        const correlationId = uuidv4();
        const responsePromise = createResponseWaiter(correlationId);
        await checkUsers(users, correlationId);

        const response = await responsePromise;
        const { exists } = response;
        console.log(exists, 'exists');

        const currentUsers = Array.isArray(task.users) ? task.users : [];
        const newUsers = [...new Set([...currentUsers, ...exists])];
        task.users = newUsers;
        await task.save();

        res.status(200).json({
            message: 'Состав задачи изменен!',
            task: {
                id: task.id,
                users: task.users
            }
        });
    } catch(error) {
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

        const correlationId = uuidv4();
        const responsePromise = createResponseWaiter(correlationId);
        await checkUsers(users, correlationId);

        const response = await responsePromise;
        const { exists } = response;
        
        const currentUsers = Array.isArray(task.users) ? task.users : [];
        const updatedUsers = currentUsers.filter(id => !exists.includes(id));
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