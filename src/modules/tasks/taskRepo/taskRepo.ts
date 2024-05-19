import db from '../../../database/models/index';

const { Tasks,Users } = db;

const getAllTasks = async () => {
    const tasks = await Tasks.findAll({
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ['id', 'username', 'email'],
            },
        ],
    });
    return tasks;
};

const createTask = async (body: any) => {
    const task = await Tasks.create({
        title: body.title,
        user_id: body.userId,
    });
    const taskWithUser = await Tasks.findOne({
        where: { id: task.id },
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ['id', 'username', 'email'],
            },
        ],
    });

    return taskWithUser;
};

const deleteTask = async (body:any) => {
    const task =  await Tasks.destroy({where: {id: body.taskId, user_id: body.userId}})
    return task;
};

const updateTask = async (body: any) => {
    await Tasks.update(
        { title: body.title },  
        {
            where: { id: body.taskId, user_id: body.userId },
            returning: true,  
            plain: true,    
        }
    );
    const updatedTask = await Tasks.findOne({
        where: { id: body.taskId },
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ['id', 'username', 'email'],
            },
        ],
    });

    return updatedTask;
};

const getTaskByUserId = async (userId:any) => {
    const task = await Tasks.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ['id', 'username', 'email'],  
            },
        ],
    });
    return task;
}

export default { getAllTasks, createTask, deleteTask, updateTask,getTaskByUserId}