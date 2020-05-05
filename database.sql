CREATE DATABSE uno;

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


CREATE VIEW boards_view AS SELECT `id_board`, `name`, `actual_player`, `id_state`, `nr_of_players` FROM uno.board;

CREATE VIEW users_view AS SELECT `id_user`, `name`, `player_nr`, role.name as `role`, `password`, `email` FROM uno.user, uno.role where uno.user.id_role = uno.role.id_role;

CREATE VIEW users_boards_view AS SELECT `id_user`, `player_nr`, user.name as `name`, role.name as `role` FROM uno.user, uno.board, uno.role WHERE uno.user.id_board = uno.board.id_board AND uno.user.id_role = uno.role.id_role;
