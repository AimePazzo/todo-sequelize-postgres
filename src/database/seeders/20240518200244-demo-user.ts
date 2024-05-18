import { QueryInterface  } from 'sequelize'

const userOne = {
  createdAt: new Date(),
  updatedAt: new Date(),
  username:'hyassin509',
  email:'hyassin509@gmail.com',
  password:'$321!pass!123$'
}
const userTwo = {
  createdAt: new Date(),
  updatedAt: new Date(),
  username:'aime509',
  email:'aime509@gmail.com',
  password:'$321!pass!123$'
}

const up = (queryInterface: QueryInterface) => queryInterface.bulkInsert('users',[userOne, userTwo])

const down = (queryInterface: QueryInterface) => queryInterface.bulkDelete('users',[])
export { up, down }