CREATE DATABASE IF NOT EXISTS disco_dev_db;
CREATE USER IF NOT EXISTS 'disco_dev'@'localhost' IDENTIFIED BY 'disco_pwd';
USE disco_dev_db;
GRANT ALL PRIVILEGES ON disco_dev_db.* TO 'disco_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'disco_dev'@'localhost';

CREATE TABLE users(
    id INT(11) NOT NULL,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 333;

DESCRIBE users;

CREATE TABLE clubs(
    id INT(11) NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    neighborhood_city VARCHAR(100) NOT NULL,
    club_type VARCHAR(30) NOT NULL,
    open_doors VARCHAR(200) NOT NULL,
    rooms VARCHAR(200) NOT NULL,
    musical_genres VARCHAR(200) NOT NULL,
    keywords VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    user_id INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE clubs
    ADD PRIMARY KEY (id);

ALTER TABLE clubs
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 333;

DESCRIBE clubs;

CREATE TABLE events(
    id INT(11) NOT NULL,
    name VARCHAR(50) NOT NULL,
    place VARCHAR(100) NOT NULL,
    date_event VARCHAR(50) NOT NULL,
    cover VARCHAR(11) NOT NULL,
    description TEXT NOT NULL,
    user_id INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_club FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE events
    ADD PRIMARY KEY (id);

ALTER TABLE events
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 333;

DESCRIBE events;

CREATE TABLE tickets(
    id INT(30) NOT NULL,
    place_event VARCHAR(100) NOT NULL,
    name_event VARCHAR(50) NOT NULL,
    date_event VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    id_card VARCHAR(30) NOT NULL,
    user_id INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_ticket FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE tickets
    ADD PRIMARY KEY (id);

ALTER TABLE tickets
    MODIFY id INT(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 111111;

DESCRIBE tickets;