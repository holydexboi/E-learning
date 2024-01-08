#!/bin/sh

# The above line tells the interpreter this code needs to be run as a shell script.

# The line below retrive and store subjects records
mysqldump e-learning subjects > subject_mysql_retrive.sql
mysqldump elearning subjects < subject_mysql_retrive.sql
rm subject_mysql_retrive.sql

# The line below retrive and store grades records
mysqldump e-learning grades > grades_mysql_retrive.sql
mysqldump elearning grades < grades_mysql_retrive.sql
rm grades_mysql_retrive.sql

# The line below retrive and store courses records
mysqldump e-learning courses > courses_mysql_retrive.sql
mysqldump elearning courses < courses_mysql_retrive.sql
rm courses_mysql_retrive.sql

# The line below retrive and store lessons records
mysqldump e-learning lessons > lessons_mysql_retrive.sql
mysqldump elearning lessons < lessons_mysql_retrive.sql
rm lessons_mysql_retrive.sql

# The line below retrive and store tests records
mysqldump e-learning tests > tests_mysql_retrive.sql
mysqldump elearning tests < tests_mysql_retrive.sql
rm tests_mysql_retrive.sql