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

## App Features
### Guest
- Explore appartments & properties using various filters:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/f8362c84-92c7-4343-8f1d-5037b041661a)

- View property details & images:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/90d53b6f-374c-4c37-b8f1-7a5fbbd909b2)
    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/31f9cf2f-0d2d-40c8-bcfb-b5cafe47e059)

- Make property reservations:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/2577a26a-0c07-439b-9b4e-342da17b7f28)

- Publish property reviews:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/84d90451-ea9f-4e99-b34f-a718315c688b)

- Get in contact with property hosts for more information & details:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/376a3885-e545-43a0-ae39-4d9d94c40706)

- View upcoming & past reservations:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/dbf849b8-6932-4b28-8e24-170372781e53)
    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/afb3a36d-e29b-415f-83a7-53fbe64c4410)

- Edit profile picture & personal information:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/86fa7542-6d06-424a-b69c-78d429f783c9)

### Host
- Edit property details, images & availability:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/370e9a41-015f-495e-9ef6-bca6c724dd94)
    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/2e9f330b-26ba-4295-acaa-b3d4d33af706)
    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/cefeccf0-8353-4dbd-91ce-b483b6570ef3)

- View property reviews & guest messages:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/3166c71c-e4aa-4272-b4d7-cfc8f8984753)

- View owned properties:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/62cbf98f-794c-4a9c-bb4b-0ea245e52f71)

- View upcoming & past reservations on owned properties:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/e6dea92f-70b5-48ad-8c63-4659938cdae4)

### Admin
- Search users by username or/and account status:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/d414970e-ec23-4b1c-9920-106392654159)

- Activate/Deactivate Host accounts:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/9d5848fd-f723-4c48-9c87-25b2d5414683)

- Export user data in JSON or XML format:

    ![image](https://github.com/pspanoudakis/WanderStay/assets/52857036/e79e7f1b-b1df-462c-91ff-2069b1de4326)
