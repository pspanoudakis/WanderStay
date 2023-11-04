# WanderStay
Summer 2023 project for the **Web Application Technologies** course in [DIT@UoA](https://www.di.uoa.gr/en)

## Team members
- [Pavlos Spanoudakis](https://github.com/pspanoudakis)
- [Theodora Troizi](https://github.com/theodoratrz)

## About the project
This was a project focused around creating a **property reservation** platform:
- **Guest** users can search and reserve properties.
- **Host** users can upload their properties and edit their information & availability.
- **Admin** users can enable/disable host users and export application data.

All project demands & requirements are described in detail in [task.pdf](./task.pdf).

## Project phases
- Designing the UI appearance using [Uizard](https://uizard.io/) wireframes
- Designing the project architecture and structure
- Developing the application

## Technologies & Tools used
- **React** & [Tailwind CSS](https://tailwindcss.com/) for the front-end application.
- **SpringBoot** for back-end & REST API. \
[Postman](https://www.postman.com/) was used for testing API endpoints.
- **PostgreSQL** is the selected DBMS. \
The schema was created using [DBeaver](https://dbeaver.io/).
- **Docker**

## Project parts
- Front-end application for all users (`client-app`)
- Back-end & REST API application (`server-app`)
- Database schema & data (`db`)

## Deployment
Docker is required.
- Clone the repository locally.

- Use `docker-compose up` to trigger the build & deployment process.
This will create 3 containers:
    - `server-app-container` listening to port 8080
    - `db-container` listening to port 5432
    - `client-app-container` listening to port 3000
- You may then explore the front-end application in your browser, by visiting `http://localhost:3000`.
