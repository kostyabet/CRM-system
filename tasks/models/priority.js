const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

// --------------------------------------------------------

const Priority = sequelize.define('t_priority', {
    RU: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EN: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// --------------------------------------------------------

const defaultPriorities = [
    { RU: 'Легко',          EN: 'Low' },
    { RU: 'Средне',         EN: 'Middle' },
    { RU: 'Тяжело',         EN: 'High' },
    { RU: 'Не выбранно',    EN: 'None' }
];

async function initDefaultPriorities() {
    const count = await Priority.count();
    if (count === 0) {
        await Priority.bulkCreate(defaultPriorities);
        console.log('✅ Начальные приоритеты добавлены');
    } else {
        console.log('ℹ️ Приоритеты уже существуют, пропускаем инициализацию');
    }
}

module.exports = { Priority, initDefaultPriorities };