-- User Table
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Book Table
CREATE TABLE "Books" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score FLOAT DEFAULT -1,
    status BOOLEAN DEFAULT TRUE
);

-- Borrow Table
CREATE TABLE "Borrows" (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    bookId INTEGER NOT NULL,
    borrowDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    returnDate TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES "Users" (id) ON DELETE CASCADE,
    FOREIGN KEY (bookId) REFERENCES "Books" (id) ON DELETE CASCADE
);

-- Rating Table
CREATE TABLE "Ratings" (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    bookId INTEGER NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10),
    borrowId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES "Users" (id) ON DELETE CASCADE,
    FOREIGN KEY (bookId) REFERENCES "Books" (id) ON DELETE CASCADE,
    FOREIGN KEY (borrowId) REFERENCES "Borrows" (id) ON DELETE CASCADE
);

-- Create indexes (optional but can help performance)
CREATE INDEX idx_user_id ON "Borrows" (userId);
CREATE INDEX idx_book_id ON "Borrows" (bookId);
CREATE INDEX idx_borrow_id ON "Ratings" (borrowId);
CREATE INDEX idx_book_id_ratings ON "Ratings" (bookId);
