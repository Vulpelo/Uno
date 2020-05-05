# Card game Uno for a browser.

Basic rules on https://en.wikipedia.org/wiki/Uno_(card_game)

* Server supports multiple uno games at the same time
* User can create an account using e-mail and password
* Multiple account permissions: Admin, Host, User
* At each uno game can participate 1-4 players

### Implemented special cards:
* draw two cards (next player draws 2 cards and his turn is skipped)
* draw four cards and change color (next player draws 4 cards, his turn is skiped and player changes a color)
* change color (player can change a color)
* skip turn (next player's turn is skiped)
* reverse queue (players queue is reversed)

## Example Installation

On windows install app called [XAMPP](https://www.apachefriends.org/pl/index.html). It allowes you to deploy Apache and MySQL servers.

After installation, run Apache and MySQL using XAMPP 

### Setting database

1. In web browser enter http://localhost/phpmyadmin/ ,
2. Go under SQL tab and run sql command located in 'database.sql' file. (it should create database with name 'uno' with empty tables)

### To run project 

1. Move project under folder of your XAMPP folder destination. (E.g.  C:\xampp\htdocs\uno) ,
2. In browser's url enter http://localhost/uno

## Screenshots

![Login Page](/example/loginPage.jpg)

![Homepage](/example/homepage.jpg)

![Game table](/example/table.jpg)
