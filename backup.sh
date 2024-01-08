#!/bin/sh

# The above line tells the interpreter this code needs to be run as a shell script.

#The line below initiate the mysql command prompt session within the MySQL service session

# code below fetch the eleaarning backup file
wget 65.20.102.32:80/sakila_mysql_dump.sql

mysql

# create the database
create database e-learning;

# use the newly created empty sakila database
use e-learning;

# restore the e-learning mysql dump file
source elearning_mysql_dump.sql;