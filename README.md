# React chat app with django backend
༼☯﹏☯༽
I am trying, okay?!

This is me trying to learn web development.
All feedbacks are welcome.( •̀ᄇ• ́)ﻭ✧
____

## Installation

1. Installing the frontend
   1. Clone the repository   
`git clone https://github.com/suloch/django-react-chat.git`

   2. Enter the directory   
`cd django-react-chat`

   3. Install the dependencies for react   
`npm i`

2. Install django for backend

   1. Enter the server directory   
`cd server`

   2. Create virtual environment using virtualenv
if you dont have virtualenv installed, install it using   
`pip3 install virtualenv`   
`virtualenv --python=python3.7 env`

   3. start the environment   
`sorce env/bin/activate`   

   4. Install django and rest framework   
`pip install django djangorestframework`

   5. install channels for asgi   
`pip install django-channels`

___

## Running

1. Start the backend django server

   1. Enter the django project directory   
`cd server/o_o/`

   2. start the virtual environment, if not started already   
`source ../env/bin/activate`

   3. start redis on port 6379 django channels need this, idk why   
`docker -p 6379:6379 -d redis`
 
   4. Finally!, （＾ｖ＾） start the django server on port 9000   
`python manage.py runserver 9000`

   5. Errors?!!! (・∧‐)ゞ Install the dependencies I missed out   


2. Start the front react server  

   1. Enter the root project folder  

   2. Start the server     
`npm start`

It should work, I am not sure.¯\_(ツ)_/¯
