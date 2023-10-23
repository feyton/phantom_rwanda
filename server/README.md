### Phantom backend

## Introduction

This is a the backend repository for Phantom project which is an application that aims at addressing a problem of commuters in Kigali who spend a long time at the bus stations or in queues waiting for buses to come. it will allow simulating bus movements and enabling passengers to track their locations & movements.

- [ ] Check out Phantom frontend repository [linked here](https://github.com/codebantis/phantom-fn)
- [ ] Check the hosted Frontend application [linked here](https://phantom.co.rw)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project requires a terminal and a web browser or an API testing program to run and test. For development, it requires a code editor.

### Installation

The **`Docker compose file`** give you access to three images running on different ports and can talk to each other.

1. **Frontend image**: The react app is served under **http://localhost:3001**
2. **Backend image**: The node.js app served under **http://localhost:5000**
3. **Postgres Database**: The Postgres database running inside the container not open to the public. Only accessible through the backend application.

#### Development environment

Clone the project repository linked [here](https://github.com/codenatis/phantom-bn.git)

```git
git clone https://github.com/Codebantis/phantom-bn.git
cd phantom-bn
touch .env // fill all required information as in .env.sample.md
npm install
//if you have postgres installed, start it
// if you want to use **Docker** follow
docker run --name phantom-postgres -e POSTGRES_PASSWORD=1234 -e POSTGRES_USER=phantom -d -p 5432:5432 postgres
npm run start // to start in watch mode use <npm run dev>
//open postman to http://localhost:5000/
// open the browser and got to http://localhost:5000/docs
```

### Configuration

You can configure the application with the following [environment variables]:

> Refer to the `.env.sample` file for the configuration required

#### Docker container for testing

To run this project, you will need to have the following:

- [Docker](https://www.docker.com/products/docker-desktop/) installed and running
- [Cloned this repository repository](https://github.com/atlp-rwanda/phantom-be-codebandits)

Follow the instructions below to get started:

```git
git clone https://github.com/atlp-rwanda/phantom-be-codebandits
cd phantom-be-codebandits
touch .env // fill all required information as in .env.sample.md
docker compose up --build  // to setup docker images
//open your browser to http://localhost:5000/
```

## Authors

- **Codebandits**
