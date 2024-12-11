import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/database";

interface BorrowAttributes {
    id: number;
    userId: number;
    bookId: number;
    borrowDate: Date;
    returnDate: Date | null;
}

interface BorrowCreationAttributes extends Optional<BorrowAttributes, "id"> { }

class Borrow
    extends Model<BorrowAttributes, BorrowCreationAttributes>
    implements BorrowAttributes {
    id!: number;
    userId!: number;
    bookId!: number;
    borrowDate!: Date;
    returnDate!: Date | null;

    static associate(models: any) {
        Borrow.belongsTo(models.User, { foreignKey: "userId", as: "user" });
        Borrow.belongsTo(models.Book, { foreignKey: "bookId", as: "book" });
        Borrow.hasOne(models.Rating, { foreignKey: "borrowId", as: "rating" });
    }
}

Borrow.init(
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
        borrowDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Borrow",
        timestamps: false,
    }
);

export default Borrow;
