CREATE DATABASE IF NOT EXISTS projetgraphql;

USE projetgraphql;

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4;

INSERT INTO
    `role`
VALUES
    (1, 'Student'),
    (2, 'Teacher'),
    (3, 'Management');

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `id_role` int(11),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_role`) REFERENCES `role` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4;

INSERT INTO
    `users`
VALUES
    (
        1,
        'Archibald',
        'Sabatier',
        'archisabatier@gmail.com',
        'password',
        1
    ),
    (
        2,
        'Julian',
        'Casablancas',
        'juliancasa@gmail.com',
        'password',
        1
    ),
    (
        3,
        'Fabrizio',
        'Moretti',
        'fabriziomore@gmail.com',
        'password',
        1
    ),
    (
        4,
        'Albert',
        'Hammond',
        'alberthamm@gmail.com',
        'password',
        1
    ),
    (
        5,
        'Nick',
        'Valensi',
        'nickvale@gmail.com',
        'password',
        1
    ),
    (
        6,
        'Nikolai',
        'Fraiture',
        'nikolaifrai@gmail.com',
        'password',
        1
    ),
    (
        7,
        'Kurt',
        'Cobain',
        'kurtcoba@gmail.com',
        'password',
        2
    ),
    (
        8,
        'John',
        'Lennon',
        'johnlenn@gmail.com',
        'password',
        2
    ),
    (
        9,
        'Karen',
        'O',
        'kareno@gmail.com',
        'password',
        3
    );

DROP TABLE IF EXISTS `subject`;

CREATE TABLE `subject` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

INSERT INTO
    `subject`
VALUES
    (1, 'php'),
    (2, 'sql'),
    (3, 'html'),
    (4, 'css');

DROP TABLE IF EXISTS `marks`;

CREATE TABLE `marks` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `value` float NOT NULL,
    `id_subject` int(11),
    `id_student` int(11),
    `id_teacher` int(11),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id`),
    FOREIGN KEY (`id_student`) REFERENCES `users` (`id`),
    FOREIGN KEY (`id_teacher`) REFERENCES `users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4;

INSERT INTO
    `marks`
VALUES
    (1, 18.41, 1, 1, 7),
    (2, 6.78, 1, 2, 7),
    (3, 10.12, 4, 4, 8),
    (4, 12, 3, 3, 8);

DROP TABLE IF EXISTS `classes`;

CREATE TABLE `classes` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

INSERT INTO
    `classes`
VALUES
    (1, 'master dev 1'),
    (2, 'bachelor cyber 1');

DROP TABLE IF EXISTS `users_classes`;

CREATE TABLE `users_classes` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `id_users` int(11),
    `id_classes` int(11),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_users`) REFERENCES `users` (`id`),
    FOREIGN KEY (`id_classes`) REFERENCES `classes` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4;

INSERT INTO
    `users_classes`
VALUES
    (1, 1, 1),
    (2, 2, 1),
    (3, 3, 2),
    (4, 4, 2),
    (5, 5, 2),
    (6, 6, 2);

DROP TABLE IF EXISTS `building`;

CREATE TABLE `building` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `adress` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

INSERT INTO
    `building`
VALUES
    (
        1,
        'République',
        '32 avenue de la République, 94800'
    ),
    (2, 'Gorki', '136 bis Bd Maxime Gorki, 94800');

DROP TABLE IF EXISTS `classroom`;

CREATE TABLE `classroom` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `id_building` int(11),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_building`) REFERENCES `building` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4;

INSERT INTO
    `classroom`
VALUES
    (1, 'A-001', 1),
    (2, 'A-101', 1),
    (3, 'A-102', 1),
    (4, 'B-001', 1),
    (5, 'B-002', 1),
    (6, 'G-001', 2),
    (7, 'G-002', 2),
    (8, 'G-003', 2);

DROP TABLE IF EXISTS `classes_classroom`;

CREATE TABLE `classes_classroom` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `date_min` DATETIME NOT NULL,
    `date_max` DATETIME NOT NULL,
    `id_classes` int(11),
    `id_classroom` int(11),
    `id_teacher` int(11),
    `id_subject` int(11),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_classes`) REFERENCES `classes` (`id`),
    FOREIGN KEY (`id_classroom`) REFERENCES `classroom` (`id`),
    FOREIGN KEY (`id_teacher`) REFERENCES `users` (`id`),
    FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4;

INSERT INTO
    `classes_classroom`
VALUES
    (
        1,
        '2023-01-11 09:00:44',
        '2023-01-11 13:00:21',
        1,
        4,
        7,
        1
    ),
    (
        2,
        '2023-01-11 14:00:44',
        '2023-01-11 18:00:21',
        1,
        4,
        7,
        1
    ),
    (
        3,
        '2023-01-12 08:00:00',
        '2023-01-12 12:00:00',
        1,
        7,
        7,
        2
    ),
    (
        4,
        '2023-01-12 14:00:00',
        '2023-01-12 16:00:00',
        1,
        7,
        7,
        2
    ),
    (
        5,
        '2023-01-11 09:00:00',
        '2023-01-11 13:00:21',
        2,
        1,
        8,
        4
    );

DROP TABLE IF EXISTS `absences`;

CREATE TABLE `absences` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `id_classes_classroom` int(11),
    `id_users` int(11),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_classes_classroom`) REFERENCES `classes_classroom` (`id`),
    FOREIGN KEY (`id_users`) REFERENCES `users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4;

INSERT INTO
    `absences`
VALUES
    (1, 2, 2),
    (2, 5, 4),
    (3, 5, 5);