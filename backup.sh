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

        # if rm -r /uploads; then
        #     echo 'existing upload deleted'

            unzip -o upload.zip
        # else
        #     echo 'cant delete directory'
        # fi 
    else
        echo 'can not download file'
    fi

    # The line below retrive and store subjects records
    mysqldump elearning subjects > subject_mysql_retrive.sql
    mysqldump e_learning subjects < subject_mysql_retrive.sql
    rm subject_mysql_retrive.sql

    # The line below retrive and store grades records
    mysqldump elearning grades > grades_mysql_retrive.sql
    mysqldump e_learning grades < grades_mysql_retrive.sql
    rm grades_mysql_retrive.sql

    # The line below retrive and store courses records
    mysqldump elearning courses > courses_mysql_retrive.sql
    mysqldump e_learning courses < courses_mysql_retrive.sql
    rm courses_mysql_retrive.sql

    # The line below retrive and store lessons records
    mysqldump elearning lessons > lessons_mysql_retrive.sql
    mysqldump e_learning lessons < lessons_mysql_retrive.sql
    rm lessons_mysql_retrive.sql

    # The line below retrive and store tests records
    mysqldump elearning tests > tests_mysql_retrive.sql
    mysqldump e_learning tests < tests_mysql_retrive.sql
    rm tests_mysql_retrive.sql


else
    echo 'unable to download the backup file'
    exit
fi
rm elearning.sql