import { Model, DataTypes, Sequelize } from 'sequelize';

interface UsersAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

module.exports = (sequelize: Sequelize) => {
    class Users extends Model<UsersAttributes> implements UsersAttributes {
        declare id: number;
        declare username: string;
        declare email: string;
        declare password: string;
        declare createdAt: Date;
        declare updatedAt: Date;

        // Define any static methods or associations here
        static associate(models: any) {
            Users.hasMany(models.Tasks, { foreignKey: 'user_id' });
        //     Users.hasMany(models.Buses, { foreignKey: 'driver_id' });
        }
    }

    Users.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: new DataTypes.STRING(50),
                allowNull: false,
            },
            email: {
                type: new DataTypes.STRING(50),
                allowNull: false,
            },
            password: {
                type: new DataTypes.STRING(50),
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
            sequelize,
            tableName: 'users',
            modelName:'users',
            timestamps: true,
        }
    );

    return Users;
};
