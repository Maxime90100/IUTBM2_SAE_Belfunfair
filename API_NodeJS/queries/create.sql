drop table if exists artistes;
drop table if exists manegesInscrit;
drop table if exists emplacementsManeges;
drop table if exists maneges;
drop table if exists standsInscrit;
drop table if exists emplacementsStands;
drop table if exists stands;
drop table if exists staff;
drop table if exists types_manege;
drop table if exists users;

create table users(
    id serial,
    role varchar(50),
    firstname varchar(50),
    surname varchar(50),
    email varchar(50),
    password varchar(255),
    primary key (id)
);

create table types_manege(
    id serial,
    libelle varchar(50),
    primary key (id)
);

create table maneges(
  id serial,
  id_user int,
  name varchar(50),
  type int,
  taille_min int,
  description varchar(1000),
  images text[],
  status varchar(50),
  primary key (id),
  foreign key (id_user) references users(id),
  foreign key (type) references types_manege(id)
);

create table emplacementsManeges(
    id serial,
    primary key (id)
);

create table manegesInscrit(
  id serial,
  id_manege int,
  id_emplacement int,
  dateDebut date,
  dateFin date,
  primary key (id),
  foreign key (id_manege) references maneges(id),
  foreign key (id_emplacement) references emplacementsManeges(id)
);

create table stands(
  id serial,
  id_user int,
  name varchar(50),
  description varchar(1000),
  images text[],
  status varchar(50),
  primary key (id),
  foreign key (id_user) references users(id)
);

create table emplacementsStands(
    id serial,
    primary key (id)
);

create table standsInscrit(
  id serial,
  id_stand int,
  id_emplacement int,
  dateDebut date,
  dateFin date,
  primary key (id),
  foreign key (id_stand) references stands(id),
  foreign key (id_emplacement) references emplacementsStands(id)
);

create table staff(
    id serial,
    id_user int,
    firstname varchar(50),
    lastname varchar(50),
    function varchar(50),
    primary key (id),
    foreign key (id_user) references users(id)

);

create table artistes(
  id serial,
  id_user int,
  name varchar(50),
  description varchar(255),
  images text[],
  groupe text,
  primary key (id),
  foreign key (id_user) references users(id)
);

insert into users(role, firstname, surname, email, password) values ('organisateur','orga1','orga1', 'orga1@orga1.com','$2b$10$94kO1uWdRJrMNCozXZII7OE38Yxd7oQFsA.10iq.gZOg35FEzralO');
insert into users(role, firstname, surname, email, password) values ('organisateur','orga2','orga2', 'orga2@orga2.com','$2b$10$IAZ6pccUb..oKrKxh8iLVeJMS0JPu9YWIfUlNQl3T5rYPINtd5Eai');
insert into users(role, firstname, surname, email, password) values ('prestataire','presta1','presta1', 'presta1@presta1.com','$2b$10$94kO1uWdRJrMNCozXZII7OE38Yxd7oQFsA.10iq.gZOg35FEzralO');
insert into users(role, firstname, surname, email, password) values ('prestataire','presta2','presta2', 'presta2@presta2.com','$2b$10$IAZ6pccUb..oKrKxh8iLVeJMS0JPu9YWIfUlNQl3T5rYPINtd5Eai');

insert into  types_manege(libelle) values ('Sensations');
insert into  types_manege(libelle) values ('Grand public');

insert into maneges(id_user, name, type, taille_min, description, images, status) values (3,'Autos-tamponeuses', 2, 120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{"/img/upload/image-maneges-1-auto-tamponeuse-1666876806176.jpeg"}','attributed');
insert into maneges(id_user, name, type, description, images, status) values (3,'Tasses', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into maneges(id_user, name, type, taille_min, description, images, status) values (4,'Bras-mécanique', 1, 160, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{"/img/upload/image-maneges-3-bras-mÃ©canique-1668523128948.jpeg","/img/upload/image-maneges-3-bras-mÃ©canique-2-1668524572623.jpeg"}','attributed');
insert into maneges(id_user, name, type, taille_min, description, images, status) values (4,'Chenille', 2, 120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into maneges(id_user, name, type, description, images, status) values (3,'Carrousel', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into maneges(id_user, name, type, description, images, status) values (3,'Pieuvre', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into maneges(id_user, name, type, taille_min, description, images, status) values (4,'Chaises-volantes', 2, 120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','not_attributed');
insert into maneges(id_user, name, type, description, images, status) values (4,'Pinces', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','not_attributed');

insert into stands(id_user, name, description, images, status) values (3,'chez gipsy','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into stands(id_user, name, description, images, status) values (3,'kebab','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into stands(id_user, name, description, images, status) values (4,'Vapiano','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into stands(id_user, name, description, images, status) values (4,'ritz','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','not_attributed');

insert into emplacementsManeges(id) values (1);
insert into emplacementsManeges(id) values (2);
insert into emplacementsManeges(id) values (3);
insert into emplacementsManeges(id) values (4);
insert into emplacementsManeges(id) values (5);
insert into emplacementsManeges(id) values (6);
insert into emplacementsManeges(id) values (7);
insert into emplacementsManeges(id) values (8);

insert into emplacementsStands(id) values (1);
insert into emplacementsStands(id) values (2);
insert into emplacementsStands(id) values (3);
insert into emplacementsStands(id) values (4);
insert into emplacementsStands(id) values (5);
insert into emplacementsStands(id) values (6);
insert into emplacementsStands(id) values (7);
insert into emplacementsStands(id) values (8);
insert into emplacementsStands(id) values (9);
insert into emplacementsStands(id) values (10);

insert into manegesInscrit(id_manege, id_emplacement, dateDebut, dateFin) values (1,2,'20-06-2022','20-07-2022');
insert into manegesInscrit(id_manege, id_emplacement, dateDebut, dateFin) values (2,2,'21-07-2022','20-08-2022');
insert into manegesInscrit(id_manege, id_emplacement, dateDebut, dateFin) values (3,1,'30-06-2022','15-08-2022');
insert into manegesInscrit(id_manege, id_emplacement, dateDebut, dateFin) values (4,7,'01-07-2022','20-07-2022');
insert into manegesInscrit(id_manege, id_emplacement, dateDebut, dateFin) values (5,3,'10-07-2022','10-08-2022');
insert into manegesInscrit(id_manege, id_emplacement, dateDebut, dateFin) values (6,6,'10-07-2022','20-07-2022');

insert into standsInscrit(id_stand, id_emplacement, dateDebut, dateFin) values (1,3,'20-06-2022','20-08-2022');
insert into standsInscrit(id_stand, id_emplacement, dateDebut, dateFin) values (2,6,'20-06-2022','20-08-2022');
insert into standsInscrit(id_stand, id_emplacement, dateDebut, dateFin) values (3,10,'20-06-2022','20-08-2022');

insert into staff(id_user, firstname, lastname, function) values (1,'Shakir','Laabany','security');

insert into artistes(id_user, name, description, images, groupe) values (3,'Maitre Gims','Maitre Gims est un rappeur français, né le 9 novembre 1986 à Vitry-sur-Seine (Val-de-Marne). Il est le fils de l’ancien footballeur et entraîneur de football, Gimsley, et de la chanteuse et comédienne, Marie-Claude Pietragalla.','{}','');
insert into artistes(id_user, name, description, images, groupe) values (3,'Jesse Rutherford',' Jesse Rutherford fait partie de The neighbourhood qui est un groupe de rock américain, originaire de Los Angeles, en Californie.','{}', 'Zach abdels, Mikey Margott Bryan Sammis');
