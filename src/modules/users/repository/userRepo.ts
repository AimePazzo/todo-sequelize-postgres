import db from '../../../database/models/index';

const { Users } = db;

const getUsers = async() => {
    const users = await Users.findAll();
    return users;
}



const createUser = async (body: any) => {
    try {
        const user = await Users.create(body);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
const getUserByEmail = async(email:string) => {
    const user = await Users.findOne({where: { email }});
    return user;
}

export default {createUser,getUsers,getUserByEmail}