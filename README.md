##React -laravel rest api with passport authentication  Transport Management System

-- To setup System Need

Php 7.4 Up
npm node-v18.16  or up
Mysql


##Clone Project##

#Setup Backend

open  backend folder and create new env file 
Crteate new database in Mysql
setup database settings in env



run composer install

run php artisan migrate  (database tables)
run php artsan db:seed 

php artisan passport:install (create passport client)

php artisan key:generate (for genarete app key)

php artisan storage:link (link storage folder)


#setup fontend 
open fontend folder and run npm install on cmd



#run app
open backend folder and run php artisan serve command 
oen fontend folder and run npm start command 



fontend run on http://localhost:3000/
backend run on http://localhost:8000/
#defoult user



   User = admin@admin.com
   password =admin

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Git = https://github.com/hasitha996