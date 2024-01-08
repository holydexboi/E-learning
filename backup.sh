#!/bin/sh
# The above line tells the interpreter this code needs to be run as a shell script.

# Set the database name to a variable. 
DATABASE='elearning'

# This will be printed on to the screen. In the case of cron job, it will be printed to the logs.
echo "Pulling Database: This may take a few minutes"

# Set the folder where the database backup will be stored
backupfolder=/root/Projects/E-learning/uploads/images

sqlfile=$backupfolder/elearrning.sql
zipfile=$backupfolder/elearning.gz

if mysqldump  $DATABASE > $sqlfile ; then
   echo 'Sql dump created'
    # Compress backup 
    if gzip -c $sqlfile > $zipfile; then
        echo 'The backup was successfully compressed'
    else
        echo 'Error compressing backupBackup was not created!' 
        exit
    fi
   # rm $sqlfile 
else
   echo 'pg_dump return non-zero code No backup was created!' 
   exit
fi