# javabook

The project uses Spring boot in backend and Angular in frontend.

The backend is containerized with Docker and deployed on Render.

## Test

You can test the web application here:
https://frontend-j5t1.onrender.com

## Features

- Check weather information in different locations
- Local and production-ready configuration
- Backend containerized using Docker

## Installation

- Clone the repository:

    ```
    git clone https://github.com/jorgechavezpalomino/javabook
    cd javabook
    ```

- Install frontend dependencies:

    ```
    cd frontend
    npm install
    ```

## Run in local

1. **Backend**

- The backend uses a third-party API (https://www.weatherapi.com/).

    Create a local "application.properties" file at:

    backend/src/main/resources/application.properties

    With the following content:

    ```
    server.port=${PORT:8080}
    spring.application.name=javabook
    weatherApi.key=your_weather_api_key
    weatherApi.url=https://api.weatherapi.com/v1/current.json
    ```

- Build the Docker image for the backend:

    ```
    docker build -f Dockerfile.local -t spring-dev .
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

    The backend is deployed on Render using Docker.

- Add the following environment variables in the Render dashboard:

    ```
    FRONTEND_URL=your_frontend_url
    PORT=8080
    WEATHERAPI_KEY=your_weather_api_key
    ```

2. **Frontend**

- Update the API URL in "environment.prod.ts":

    ```
    export const environment = {
        production: true,
        apiUrl: 'https://your-backend-url.onrender.com'
    };
    ```
