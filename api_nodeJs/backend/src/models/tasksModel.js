const connection = require('./connection');

const getAll = async () => {
    const tasks = await connection.execute('SELECT * FROM tasks');
    return tasks[0];
};

const createTask = async (task = undefined || {} ) => {
    const { title } = task;
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';
    const dateUTC = new Date(Date.now()).toUTCString();
    const createdTask = await connection.execute(query, [title, 'parado', dateUTC]);
    return createdTask[0];
}

module.exports = {
    getAll,
    createTask
};