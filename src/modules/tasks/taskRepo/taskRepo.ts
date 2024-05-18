import database from '../../../database/config/dbConnection';


const getTasks = async () => {
    const tasks = await database.query(`
    SELECT t.id,t.title,t.createdAt, t.updatedAt,
            (SELECT ROW_TO_JSON(user_obj) FROM(
            SELECT id,name FROM users WHERE id = t.user_id
            )user_obj) AS user
    FROM  tasks t`)
    return tasks.rows;
}

const createTask = async (body:any) => {
    const task =  await database.query({
        text: 'INSERT INTO tasks (title,user_id) VALUES ($1,$2) RETURNING *',
        values: [body.title,body.userId]
    })
    return task.rows[0];
}

const deleteTask = async (body:any) => {
    const task =  await database.query({
        text: 'DELETE FROM tasks t WHERE t.id = $1 AND t.user_id = $2  RETURNING *',
        values: [body.taskId, body.userId]
    })
    return task.rows[0];
};

const updateTask = async (body:any) => {
    const task =  await database.query({
        text: 'UPDATE tasks t SET title = $1 WHERE t.id = $2 AND t.user_id = $3 RETURNING *',
        values: [body.title, body.taskId, body.userId]
    })
    return task.rows[0];
}

const getTaskByUserId = async (userId:any) => {
    const tasks = await database.query(`
    SELECT t.id,t.title,t.createdAt, t.updatedAt,
            (SELECT ROW_TO_JSON(user_obj) FROM(
            SELECT id,name,email FROM users WHERE id = t.user_id
            )user_obj) AS user
    FROM  tasks t WHERE t.user_id = $1`, [userId])
    return tasks.rows;
}

export default { getTasks, createTask, deleteTask, updateTask,getTaskByUserId}