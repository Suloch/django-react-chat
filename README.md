# React chat app with django backend
I am trying, okay?!
This is me trying to learn web development.
All feedbacks are welcome.

## Installation

-Installing the frontend

--Clone the repository
`git clone https://github.com/suloch/`

--Enter the directory
`cd `

--Install the dependencies for react
`npm i`

-Install django for backend

--Enter the server directory
`cd server`

--Create virtual environment using virtualenv
if you dont have virtualenv installed, install it using
`pip3 install virtualenv`
`virtualenv --python=python3.7 env`

--start the environment
`sorce env/bin/activate`

--install django and rest framework
`pip install django djangorestframework`

--install chanells for asgi
`pip install django-channels`


## Running

-Start the backend django server

--Enter the django project directory
`cd server/o_o/`

--start the virtual environment, if not started already
`source ../env/bin/activate`

--start redis on port 6379 django channels need this, idk why
`docker -p 6379:6379 -d redis`

--Finally!, start the django server on port 9000
`python manage.py runserver 9000`

--Errors?!!! *sigh* Install the dependencies I missed out


-Start the front react server

-- Enter the root project folder

--Start the server
`npm start`

It should work, I am not sure.
