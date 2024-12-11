import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/database";

interface BookAttributes {
    id: number;
    name: string;
    score: number;
    status: boolean;
}

interface BookCreationAttributes
    extends Optional<BookAttributes, "id" | "score" | "status"> { }

class Book
    extends Model<BookAttributes, BookCreationAttributes>
    implements BookAttributes {
    id!: number;
    name!: string;
    score!: number;
    status!: boolean;

    static associate(models: any) {
        Book.hasMany(models.Borrow, { foreignKey: "bookId", as: "borrows" });
        Book.hasMany(models.Rating, { foreignKey: "bookId", as: "ratings" });
    }
}

Book.init(
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
        score: {
            type: DataTypes.FLOAT,
            defaultValue: -1,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: "Book",
        timestamps: false,
    }
);

export default Book;
