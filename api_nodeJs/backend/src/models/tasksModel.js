const connection = require('./connection');

const getAll = async () => {
    const tasks = await connection.execute('SELECT * FROM tasks');
    return tasks[0];
};

const insertCreateTask = async (task = {}) => {
    let { title } = task;
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';
    const dateUTC = new Date(Date.now()).toUTCString();
    const createdTask = await connection.execute(query, [title, 'parado', dateUTC]);
    return {insertId: createdTask[0].insertId};
}

const updateTask = async (id, task) =>{
    let {title, status} = task;
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    const updateTask = await connection.execute(query,[title, status, id]);
    return updateTask;
}

const deleteTask = async (task) =>{
    let {id} = task;
    const query = 'DELETE FROM tasks WHERE id =  ?'
    const removetasks = await connection.execute(query,[id]);
    return removetasks;
};



module.exports = {
    getAll,
    insertCreateTask,
    updateTask,
    deleteTask
};