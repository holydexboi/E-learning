#!/bin/sh

# The above line tells the interpreter this code needs to be run as a shell script.

#The line below initiate the mysql command prompt session within the MySQL service session

# code below fetch the eleaarning backup file
if wget http://65.20.102.32:80/backup/elearning.sql; then
    echo 'Backup fetch from remote'

    # restore the e-learning mysql dump file
   if mysql -e "drop database elearning; create database elearning; use elearning; source elearning.sql;" ; then
        echo 'elearning database created'
    else
        echo 'cannot create database'
    fi
    rm upload.zip
    if wget http://65.20.102.32:80/backup/upload.zip; then 
        echo 'upload fetched frrom remote'

        if rm -r ./uploads; then
            echo 'existing upload deleted'

            unzip -o upload.zip
        else
            echo 'cant delete directory'
        fi 
    else
        echo 'can not download file'
    fi

else
    echo 'unable to download the backup file'
    exit
fi
rm elearning.sql