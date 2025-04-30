const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

// --------------------------------------------------------

const State = sequelize.define('t_state', {
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

const defaultStates = [
    { RU: 'Готово к работе',    EN: 'Ready' },
    { RU: 'В работе',           EN: 'In Progress' },
    { RU: 'На проверке',        EN: 'Review' },
    { RU: 'Выполнено',          EN: 'Done' },
    { RU: 'Не выбранно',        EN: 'None' }
];

async function initDefaultStates() {
    const count = await State.count();
    if (count === 0) {
        await State.bulkCreate(defaultStates);
        console.log('✅ Начальные статусы добавлены');
    } else {
        console.log('ℹ️ Статусы уже существуют, пропускаем инициализацию');
    }
}

module.exports = { State, initDefaultStates };