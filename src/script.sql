DROP TABLE IF EXISTS checked_out_book;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS book_copy;
DROP TABLE IF EXISTS book;

CREATE TABLE IF NOT EXISTS book (
    id serial primary key,
    title varchar(255) not null,
    author varchar(255) not null
);

CREATE TABLE IF NOT EXISTS book_copy (
    id serial primary key,
    book_id int REFERENCES book(id) not null
);

CREATE TABLE IF NOT EXISTS member (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255)
);

CREATE TABLE IF NOT EXISTS checked_out_book (
    id serial primary key,
    copy_id int REFERENCES book_copy(id),
    member_id int REFERENCES member(id),
    check_out_date date,
    return_date date
);

INSERT INTO book (title, author)
VALUES
('Midnight Sun', 'Stephenie Meyer'),
('The Giver of Stars', 'Jojo Moyes'),
('The Body', 'Bill Bryson'),
('Girl, Woman, Other', 'Bernardine Evaristo'),
('The Last Widow', 'Karin Slaughter'),
('Where the Crawdads Sing', 'Delia Owens'),
('The Boy, The Mole, The Fox and The Horse', 'Charlie Mackesy'),
('The Institute', 'Stephen King'),
('What Mummy Makes Cook', 'Rebecca Wilson'),
('A Silent Death', 'Peter May');

INSERT INTO book_copy(book_id)
VALUES
(1),
(1),
(1),
(2),
(2),
(3),
(3),
(3),
(4),
(5),
(5),
(5),
(6),
(6),
(7),
(7),
(7),
(8),
(9),
(9),
(10),
(10);

INSERT INTO member (name, email)
VALUES
('Omar Conley', 'omar.conley@gmail.com'),
('Laura Kumar', 'laura.kumar@gmail.com'),
('Marsha Romero', 'marsha.romero@gmail.com'),
('Vernon Osborn', 'vernon.osborn@gmail.com'),
('Suzannah Doherty', 'suzannah.doherty@gmail.com'),
('Arwen Bowman', 'arwen.bowman@gmail.com'),
('Emilio Brookins', 'emilio.brookins@gmail.com'),
('Efe Thompson', 'efe.thompson@gmail.com'),
('Bronte Rocha', 'bronte.rocha@gmail.com'),
('Sommer Vang', 'sommer.vang@gmail.com');

INSERT INTO checked_out_book (copy_id, member_id, check_out_date, return_date)
VALUES
(1, 3, '2020-05-12', '2020-05-31'),
(2, 7, '2020-05-19', '2020-06-08'),
(4, 1, '2020-06-10', '2020-06-24'),
(7, 2, '2020-06-06', '2020-06-20'),
(8, 5, '2020-07-19', '2020-07-30'),
(10, 2, '2020-08-17', '2020-08-29'),
(11, 2, '2020-08-24', '2020-09-09'),
(13, 6, '2020-07-04', '2020-07-18'),
(16, 1, '2020-07-07', '2020-07-21'),
(17, 9, '2020-08-16', '2020-08-30'),
(18, 7, '2020-08-13', '2020-08-27'),
(20, 10, '2020-08-09', '2020-08-22'),
(22, 4, '2020-07-22', '2020-08-06');