import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/database";

interface RatingAttributes {
    id: number;
    userId: number;
    bookId: number;
    score: number;
    borrowId: number;
}

interface RatingCreationAttributes extends Optional<RatingAttributes, "id"> { }

class Rating
    extends Model<RatingAttributes, RatingCreationAttributes>
    implements RatingAttributes {
    id!: number;
    userId!: number;
    bookId!: number;
    score!: number;
    borrowId!: number;

    static associate(models: any) {
        Rating.belongsTo(models.User, { foreignKey: "userId", as: "user" });
        Rating.belongsTo(models.Book, { foreignKey: "bookId", as: "book" });
        Rating.belongsTo(models.Borrow, { foreignKey: "borrowId", as: "borrow" });
    }
}

Rating.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        borrowId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Rating",
        timestamps: false,
    }
);

export default Rating;
