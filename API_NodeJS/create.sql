drop table if exists notesManege;
drop table if exists notesStand;
drop table if exists notesArtiste;

drop table if exists manegesInscrit;
drop table if exists emplacementsManeges;
drop table if exists maneges;
drop table if exists types_manege;

drop table if exists standsInscrit;
drop table if exists emplacementsStands;
drop table if exists stands;
drop table if exists types_stand;

drop table if exists artistesInscrit;
drop table if exists artistes;
drop table if exists types_artiste;

drop table if exists manifestations;
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

create table manifestations(
  id serial,
  dateDebut date,
  dateFin date,
  inProgress boolean,
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
  id_manifestation int,
  id_manege int,
  id_emplacement int,
  dateDebut date,
  dateFin date,
  cancel boolean,
  primary key (id),
  foreign key (id_manifestation) references manifestations(id),
  foreign key (id_manege) references maneges(id),
  foreign key (id_emplacement) references emplacementsManeges(id)
);

create table types_stand(
    id serial,
    libelle varchar(50),
    primary key (id)
);

create table stands(
  id serial,
  id_user int,
  name varchar(50),
  type int,
  description varchar(1000),
  images text[],
  status varchar(50),
  primary key (id),
  foreign key (id_user) references users(id),
  foreign key (type) references types_stand(id)
);

create table emplacementsStands(
    id serial,
    primary key (id)
);

create table standsInscrit(
  id serial,
  id_manifestation int,
  id_stand int,
  id_emplacement int,
  dateDebut date,
  dateFin date,
  cancel boolean,
  primary key (id),
  foreign key (id_manifestation) references manifestations(id),
  foreign key (id_stand) references stands(id),
  foreign key (id_emplacement) references emplacementsStands(id)
);

create table types_artiste(
  id serial,
  libelle varchar(50),
  primary key (id)
);

create table artistes(
  id serial,
  id_user int,
  name varchar(50),
  description varchar(1000),
  type int,
  images text[],
  groupe text,
  status varchar(50),
  primary key (id),
  foreign key (id_user) references users(id),
  foreign key (type) references types_artiste(id)
);

create table artistesInscrit(
  id serial,
  id_manifestation int,
  id_artiste int,
  date date,
  startHour time,
  endHour time,
  cancel boolean,
  primary key (id),
  foreign key (id_manifestation) references manifestations(id),
  foreign key (id_artiste) references artistes(id)
);

create table notesManege(
    id serial,
    id_user int,
    id_manege int,
    note float(4),
    primary key (id),
    foreign key (id_user) references users(id),
    foreign key (id_manege) references maneges(id)
);
create table notesStand(
    id serial,
    id_user int,
    id_stand int,
    note float(4),
    primary key (id),
    foreign key (id_user) references users(id),
    foreign key (id_stand) references stands(id)
);
create table notesArtiste(
    id serial,
    id_user int,
    id_artiste int,
    note float(4),
    primary key (id),
    foreign key (id_user) references users(id),
    foreign key (id_artiste) references artistes(id)
);

/* USERS */

insert into users(role, firstname, surname, email, password) values ('organisateur','orga1','orga1', 'orga1@orga1.com','$2b$10$94kO1uWdRJrMNCozXZII7OE38Yxd7oQFsA.10iq.gZOg35FEzralO');
insert into users(role, firstname, surname, email, password) values ('organisateur','orga2','orga2', 'orga2@orga2.com','$2b$10$IAZ6pccUb..oKrKxh8iLVeJMS0JPu9YWIfUlNQl3T5rYPINtd5Eai');
insert into users(role, firstname, surname, email, password) values ('prestataire','maxime','theveneau', 'maxime.theveneau@gmail.com','$2b$10$94kO1uWdRJrMNCozXZII7OE38Yxd7oQFsA.10iq.gZOg35FEzralO');
insert into users(role, firstname, surname, email, password) values ('prestataire','presta2','presta2', 'presta2@presta2.com','$2b$10$IAZ6pccUb..oKrKxh8iLVeJMS0JPu9YWIfUlNQl3T5rYPINtd5Eai');
insert into users(role, firstname, surname, email, password) values ('user','user1','user1', 'user1@user1.com','$2b$10$94kO1uWdRJrMNCozXZII7OE38Yxd7oQFsA.10iq.gZOg35FEzralO');

insert into manifestations (dateDebut, dateFin, inProgress) values ('20-06-2023','20-08-2023', TRUE);

/* MANEGES */

insert into  types_manege(libelle) values ('Sensations');
insert into  types_manege(libelle) values ('Grand public');
insert into  types_manege(libelle) values ('Enfants');

insert into maneges(id_user, name, type, taille_min, description, images, status) values (3,'Autos-tamponeuses', 2, 120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{"/img/upload/image-maneges-1-auto-tamponeuse-1666876806176.jpeg"}','attributed');
insert into maneges(id_user, name, type, description, images, status) values (3,'Tasses', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into maneges(id_user, name, type, taille_min, description, images, status) values (4,'Bras-mécanique', 1, 160, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{"/img/upload/image-maneges-3-bras-mÃ©canique-1668523128948.jpeg","/img/upload/image-maneges-3-bras-mÃ©canique-2-1668524572623.jpeg"}','attributed');
insert into maneges(id_user, name, type, taille_min, description, images, status) values (4,'Chenille', 2, 120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into maneges(id_user, name, type, description, images, status) values (3,'Carrousel', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into maneges(id_user, name, type, description, images, status) values (3,'Pieuvre', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into maneges(id_user, name, type, taille_min, description, images, status) values (4,'Chaises-volantes', 2, 120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','not_attributed');
insert into maneges(id_user, name, type, description, images, status) values (4,'Pinces', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','not_attributed');

insert into emplacementsManeges(id) values (1);
insert into emplacementsManeges(id) values (2);
insert into emplacementsManeges(id) values (3);
insert into emplacementsManeges(id) values (4);
insert into emplacementsManeges(id) values (5);
insert into emplacementsManeges(id) values (6);
insert into emplacementsManeges(id) values (7);
insert into emplacementsManeges(id) values (8);

insert into manegesInscrit(id_manege, id_manifestation, id_emplacement, dateDebut, dateFin, cancel) values (1,1,2,'20-06-2023','20-07-2023',false);
insert into manegesInscrit(id_manege, id_manifestation, id_emplacement, dateDebut, dateFin, cancel) values (2,1,2,'30-07-2023','10-08-2023',false);
insert into manegesInscrit(id_manege, id_manifestation, id_emplacement, dateDebut, dateFin, cancel) values (3,1,1,'30-06-2023','15-08-2023',false);
insert into manegesInscrit(id_manege, id_manifestation, id_emplacement, dateDebut, dateFin, cancel) values (4,1,7,'01-07-2023','20-07-2023',false);
insert into manegesInscrit(id_manege, id_manifestation, id_emplacement, dateDebut, dateFin, cancel) values (5,1,3,'10-07-2023','10-08-2023',false);
insert into manegesInscrit(id_manege, id_manifestation, id_emplacement, dateDebut, dateFin, cancel) values (6,1,6,'10-07-2023','20-07-2023',false);

/* STANDS */

insert into  types_stand(libelle) values ('Snack');
insert into  types_stand(libelle) values ('Restaurant');
insert into  types_stand(libelle) values ('Boutique');

insert into stands(id_user, name, type, description, images, status) values (3,'chez gipsy', 3,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into stands(id_user, name, type, description, images, status) values (3,'kebab', 1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into stands(id_user, name, type, description, images, status) values (4,'Vapiano', 2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','attributed');
insert into stands(id_user, name, type, description, images, status) values (4,'ritz', 1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis nulla vel justo faucibus venenatis et ut tellus. Nam ac ante purus. Donec in tempor lacus. Quisque efficitur augue ut mi bibendum, ut maximus nisi consequat. Proin pretium ante vitae elit luctus varius vitae eget nulla. Curabitur eleifend malesuada mattis. Quisque ut mi at sapien eleifend porttitor. Fusce at efficitur nulla. Vivamus ex nisl, semper ut sodales in, vulputate at dolor. Integer sit amet efficitur lorem. Aliquam vel pharetra augue. Vestibulum quis malesuada metus, et elementum lectus.','{}','not_attributed');

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
insert into emplacementsStands(id) values (11);
insert into emplacementsStands(id) values (12);
insert into emplacementsStands(id) values (13);
insert into emplacementsStands(id) values (14);

insert into standsInscrit(id_stand, id_manifestation, id_emplacement, dateDebut, dateFin, cancel) values (1,1,3,'25-06-2023','02-07-2023', false);
insert into standsInscrit(id_stand, id_manifestation, id_emplacement, dateDebut, dateFin, cancel) values (2,1,6,'18-07-2023','30-07-2023', false);
insert into standsInscrit(id_stand, id_manifestation, id_emplacement, dateDebut, dateFin, cancel) values (3,1,12,'20-06-2023','20-08-2023', false);

/* ARTISTES */

insert into types_artiste(libelle) values ('Musique');
insert into types_artiste(libelle) values ('Théâtre');

insert into artistes(id_user, name, type, description, images, groupe, status) values (3,'Le trio', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin turpis mauris, vulputate sit amet quam eu, rhoncus auctor massa. Donec id maximus eros. In porttitor et massa vestibulum bibendum. In quis nibh vitae libero tempor dignissim. Aenean convallis leo ac dapibus consequat. Vivamus quis enim tempus, feugiat odio vitae, pharetra urna. Ut id tortor pharetra, tincidunt dui non, dictum lorem. Mauris a neque id ante lacinia interdum. Morbi dapibus placerat urna, ac efficitur purus hendrerit in.', '{}', 'Eustache Durand,Emmanuelle Souplet,Daniel Dandonneau', 'wait_attribution');
insert into artistes(id_user, name, type, description, images, groupe, status) values (3,'Pinder', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin turpis mauris, vulputate sit amet quam eu, rhoncus auctor massa. Donec id maximus eros. In porttitor et massa vestibulum bibendum. In quis nibh vitae libero tempor dignissim. Aenean convallis leo ac dapibus consequat. Vivamus quis enim tempus, feugiat odio vitae, pharetra urna. Ut id tortor pharetra, tincidunt dui non, dictum lorem. Mauris a neque id ante lacinia interdum. Morbi dapibus placerat urna, ac efficitur purus hendrerit in.', '{}', 'Frédéric Edelstein, Sophie Edelstein', 'attributed');

insert into artistesInscrit(id_manifestation, id_artiste, date, startHour, endHour, cancel) values (1,1,'20-06-2023', '08:30', '12:00', false);
insert into artistesInscrit(id_manifestation, id_artiste, date, startHour, endHour, cancel) values (1,2,'20-06-2023', '14:30', '16:00', false);

/* NOTES */

insert into notesmanege(id_user, id_manege, note) values (1,1,3);
insert into notesmanege(id_user, id_manege, note) values (2,1,4.5);
insert into notesmanege(id_user, id_manege, note) values (1,4,3.3);
insert into notesmanege(id_user, id_manege, note) values (2,4,2.7);
insert into notesmanege(id_user, id_manege, note) values (1,2,3);
insert into notesmanege(id_user, id_manege, note) values (2,2,4.5);
insert into notesmanege(id_user, id_manege, note) values (3,2,3.3);
insert into notesmanege(id_user, id_manege, note) values (4,2,2.7);