import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/database";
import Borrow from "../models/Borrow";

interface UserAttributes {
    id: number;
    name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    id!: number;
    name!: string;

    public readonly borrows!: Borrow[];

    static associate(models: any) {
        User.hasMany(models.Borrow, { foreignKey: "userId", as: "borrows" });
        User.hasMany(models.Rating, { foreignKey: "userId", as: "ratings" });
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        timestamps: false,
    }
);

export default User;
