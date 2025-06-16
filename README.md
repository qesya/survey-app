## Install: Install dependencies
from survey-app (root monorepo)
```
yarn install:all
```

## Pre: Create local sqlite before you start
still from survey-app (root monorepo)
```
yarn db:migrate
```

## Step 1: Build and Run the Containers
```
docker-compose up --build -d
```

## Step 2: Run Database Migrations
```
docker-compose exec server yarn db:migrate
```

## Step 3: Access the Application
### client:
```
http://localhost:8080
```
### server:
```
http://localhost:3001
```


