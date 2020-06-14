CREATE DATABASE uno;

-- TABLES
CREATE TABLE uno.board (
	id_board INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	name VARCHAR(25) NOT NULL,
	clockwise INT(1) NOT NULL,
	actual_player INT(1) NOT NULL,
	id_state INT NOT NULL,
	last_active_date TIMESTAMP NOT NULL
);

CREATE TABLE uno.card (
	id_card INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	color VARCHAR(15) NOT NULL,
	symbol VARCHAR(15) NOT NULL,
	id_user INT NOT NULL,
	id_board INT NOT NULL
);

CREATE TABLE uno.role (
	id_role INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	name VARCHAR(30) NOT NULL
);

CREATE TABLE uno.state (
	id_state INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	name VARCHAR(20) NOT NULL
);

CREATE TABLE uno.user (
	id_user INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	name VARCHAR(30) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
	id_role INT NOT NULL DEFAULT 3,
	id_board INT DEFAULT NULL,
	player_nr INT(1) DEFAULT NULL
);

-- VIEWS
CREATE VIEW boards_view AS 
	SELECT board.`id_board`, board.`name`, `actual_player`, `id_state`, count(user.id_user) as `nr_of_players` 
	FROM uno.board left join uno.user on uno.user.id_board =  uno.board.id_board group by board.id_board;

CREATE VIEW users_view AS 
	SELECT `id_user`, user.`name` as `name`, `player_nr`, role.name as `role`, `password`, `email` 
	FROM uno.user, uno.role where uno.user.id_role = uno.role.id_role;

CREATE VIEW users_boards_view AS 
	SELECT `id_user`, `player_nr`, user.name as `name`, role.name as `role` 
	FROM uno.user, uno.board, uno.role WHERE uno.user.id_board = uno.board.id_board AND uno.user.id_role = uno.role.id_role;


-- EVENTS
CREATE EVENT `Clean_Older_Than_30_min_boards_2` 
	ON SCHEDULE EVERY 30 MINUTE STARTS '2020-01-01 00:00:00' 
	ON COMPLETION NOT PRESERVE ENABLE COMMENT 'Clean up old boards.' DO 
	DELETE FROM uno.board WHERE uno.board.last_active_date < DATE_SUB(NOW(), INTERVAL '15:0' MINUTE_SECOND);

-- TRIGGERS
CREATE TRIGGER `before_board_deletion` 
	BEFORE DELETE ON uno.`board` FOR EACH ROW
	 DELETE FROM uno.card WHERE card.id_board = OLD.id_board;

-- INSERTS
INSERT INTO uno.`state` (`id_state`, `name`) VALUES ('1', 'WAITING');
INSERT INTO uno.`state` (`id_state`, `name`) VALUES ('2', 'DURING_GAME');

INSERT INTO uno.`role` (`id_role`, `name`) VALUES ('1', 'ADMIN');
INSERT INTO uno.`role` (`id_role`, `name`) VALUES ('2', 'HOST');
INSERT INTO uno.`role` (`id_role`, `name`) VALUES ('3', 'USER');

