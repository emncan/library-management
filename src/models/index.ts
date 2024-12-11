import User from "./User";
import Book from "./Book";
import Borrow from "./Borrow";
import Rating from "./Rating";
import sequelize from "../utils/database";

const associateModels = () => {
    User.associate({ Borrow, Rating });
    Book.associate({ Borrow, Rating });
    Borrow.associate({ User, Book, Rating });
    Rating.associate({ User, Book, Borrow });
};

const syncDatabase = async () => {
    try {
        associateModels();
        await sequelize.sync({ force: true });
        console.log("Database tables have been created successfully.");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};

export { syncDatabase, User, Book, Borrow, Rating, associateModels };
