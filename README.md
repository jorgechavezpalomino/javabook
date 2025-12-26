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

- Build the backend application:

    ```
    cd backend
    mvn clean package
    ```

- Build the Docker image for the backend:

    ```
    docker build -t javabook-backend .
    ```

- Install frontend dependencies:

    ```
    cd ..
    cd frontend
    npm install
    ```

## Run in local

1. **Backend**

- Run the backend container:

    - Option 1: Run in foreground

        `docker run -p 8080:8080 javabook-backend`

    - Option 2: Run in detached mode

        `docker run -d -p 8080:8080 --name javabook-backend javabook`

2. **Frontend**

- Open a new terminal and start the frontend dev server:

    ```
    cd frontend
    ng serve
    ```
## Run in production
