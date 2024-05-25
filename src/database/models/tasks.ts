import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../config/dbConnection'
interface TasksAttributes {
    id: number;
    title: string;
    user_id: number;
    createdAt: Date;
    updatedAt: Date;
}

    class Tasks extends Model<TasksAttributes> implements TasksAttributes {
        declare id: number;
        declare title: string;
        declare user_id: number;
        declare createdAt: Date;
        declare updatedAt: Date;

        // Define any static methods or associations here
        static associate(models: any) {
            Tasks.belongsTo(models.users, { foreignKey: 'user_id' ,as: 'user' });
        //     Users.hasMany(models.Buses, { foreignKey: 'driver_id' });
        }
    }

    Tasks.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: new DataTypes.STRING(50),
                allowNull: false,
            },
            user_id: {
                type: new DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                field: 'createdAt',
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                field: 'updatedAt',
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            }
        },
        {
            sequelize: sequelizeConnection,
            tableName: 'tasks',
            modelName:'Tasks',
            timestamps: true,
        }
    );

export default Tasks;
