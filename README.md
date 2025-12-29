# javabook

The project uses Spring boot in backend and Angular in frontend.
The backend is contained using Docker.

## Features

- Check weather information in different locations
- Local and production-ready configuration

## Installation

- Clone the repository:

    ```
    git clone https://github.com/jorgechavezpalomino/javabook
    cd javabook
    ```
- The backend uses a third-party API (https://www.weatherapi.com/). You need to log in and save your API key in a "application.properties" file in the backend folder.

    ```
    spring.application.name=javabook
    weatherApi.key=your_weather_api_key
    ```

- Install frontend dependencies:

    ```
    cd ..
    cd frontend
    npm install
    ```

## Run in local

1. **Backend**

- Build the Docker image for the backend:

    ```
    cd backend
    docker build -t spring-dev .
    ```

- Run the backend container:

    - Option 1: Run in foreground

        `docker run --name spring-dev -p 8080:8080 -v "${PWD}:/app" spring-dev`

    - Option 2: Run in detached mode

        `docker run -d --name spring-dev -p 8080:8080 -v "${PWD}:/app" spring-dev`

2. **Frontend**

- Open a new terminal and start the frontend dev server:

    ```
    cd frontend
    ng serve
    ```

## Run in production

1. **Backend**

- Replace the code in the Dockerfile:

    ```
    FROM eclipse-temurin:21-jre-alpine

    WORKDIR /app

    COPY target/*.jar app.jar

    EXPOSE 8080

    ENTRYPOINT ["java","-jar","app.jar"]
    ```

2. **Frontend**

- Open a new terminal and start the frontend dev server:

    ```
    cd frontend
    ng serve
    ```
