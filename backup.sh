#!/bin/sh

# The above line tells the interpreter this code needs to be run as a shell script.

#The line below initiate the mysql command prompt session within the MySQL service session

# code below fetch the eleaarning backup file
wget http://65.20.102.32:80/backup/elearning.sql


# restore the e-learning mysql dump file
mysql -e "create database elearning; use elearning; source elearning.sql;"

rm elearning.sql