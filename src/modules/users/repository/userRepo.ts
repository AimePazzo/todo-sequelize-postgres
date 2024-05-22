import db from '../../../database/models/index';

const { users } = db;

const getUsers = async() => {
    const user = await users.findAll();
    return user;
}



const createUser = async (body: any) => {
    try {
        const user = await users.create(body);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
const getUserByEmail = async(email:string) => {
    const user = await users.findOne({where: { email }});
    return user;
}

export default {createUser,getUsers,getUserByEmail}