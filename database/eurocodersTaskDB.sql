CREATE SCHEMA `eurocoders-task` ;

USE `eurocoders-task`;

create table users(
id int not null auto_increment primary key,
username varchar(45) not null,
email varchar(255) not null,
password varchar(255) not null,
);

create table photos(
id int not null auto_increment primary key,
img varchar(255) not null,
date datetime ,
uid int not null,
cat varchar(45) not null,
title varchar(45) not null,
);