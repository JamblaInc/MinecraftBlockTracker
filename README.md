# RankIt

# Prerequisites

Python 3  
Node  
NPM  
Docker  
Docker Compose  
DBeaver (Optional)

# Remove old Docker volume

If you have previously ran the containers and encountered an issue you will need to remove the Docker volume.  
List the existing volumes on your system:

```
docker volume ls
```

If you have a volume named 'rankdata', remove it via the following command:

```
docker volume rm rankdata
```

If you have an issue removing it, ensure all containers are stopped and haning containers are pruned:

```
docker system prune -a
```

This will remove all inactive containers (BE CAREFUL).

# Config

Navigate into the server directory and run `npm i` to install the dependencies.  
Navigate into the client directory and run `npm i` to install the dependencies.  
Create a .env file in the root directory and populate contents:

```
pgUser=<user>
pgPassword=<password>
pgHost=<host>
pgPort=<port>
pgDatabase=<db_name>
```

# Database

Navigate into the database directory run the container in detached mode and pass in the .env file:

```
WINDOWS: docker-compose --env-file ..\.env up -d
LINUX: docker-compose --env-file ../.env up -d
```

Connect to the database from your host:

```
WINDOWS: psql -U postgres
LINUX: psql -U postgres -h 127.0.0.1
```

Now issue the command `\l` to list the tables. You should see some tables in the list.  
You can also use DBeaver for a much better viewing experience.

# Building the database

Drop the current database (if it exists) by navigating into the database directory and running:

```
WINDOWS: python .\drop_database.py --db_user postgres --db_name rank_it
LINUX: ./drop_database.sh
```

Still inside the database directory, create the database by running the build script:

```
WINDOWS: python .\build_database.py
LINUX: ./build_database.sh
```

_Note: If on Linux, ensure the shell scripts are executable_

# Server

In order to run the server, navigate to the root directory and run:

```
nodemon .\server\server.js
OR
node .\server\server.js
```

# Client

Navigate into the client folder and run:

```
npm start
```

This will launch the app on port 3000

# Demo

Navigate to http://localhost:3000/ and have fun!
