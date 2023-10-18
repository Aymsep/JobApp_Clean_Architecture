# JobApp_Clean_Architecture
This repository contains the backend code for a job board application developed using MongoDB, Express.js, Node.js and follows the principles of clean architecture.
# Job Board - Backend

This repository contains the backend code for a job board application developed using MongoDB, Express.js, Node.js. The backend focuses on user authentication, job management, and related server-side functionalities. It follows the principles of clean architecture, emphasizing security and performance for a job board platform.

## Features

- **User Authentication:**
  - Register new users.
  - User login with authentication and JWT (JSON Web Tokens).
  - User profile management.

- **Job Management:**
  - Create new job listings.
  - Delete jobs.
  - Fetch a user's jobs.
  - Retrieve all job listings.
  - Retrieve a single job listing.
  - Update job listings.

## Endpoints

- **Authentication:**
  - `POST /register`: Register a new user.
  - `POST /login`: Authenticate and login a user.
  - `GET /profile`: Get the user's profile information.

- **Job Management:**
  - `POST /addJob`: Create a new job listing.
  - `DELETE /deleteJob/:jobId`: Delete a specific job listing.
  - `GET /myjobs`: Get job listings associated with the user.
  - `GET /alljobs`: Get all job listings.
  - `GET /singlejob/:jobId`: Get a specific job listing.
  - `PATCH /updatejob/:jobId`: Update a specific job listing.

## Clean Architecture

The project follows clean architecture principles, emphasizing a clear separation of concerns:

**Service Layer** : In the service layer, you'll find the core business logic of the application. Services contain the application's use cases and domain-specific operations. For instance, we have UserService and JobService to handle user and job-related operations.

**Repository Layer**: Repositories are responsible for managing data access and database interactions. They encapsulate the underlying data models and provide methods for database operations. For example, UserRepository and JobRepository manage user and job data storage.

**Model Layer**: The model layer contains data structures that define the schema of the data to be stored in the database. These are often implemented as Mongoose schemas and include entities like UserSchema and JobSchema.

**Controller Layer**: Controllers handle HTTP requests and are responsible for orchestrating the flow of data between the client and the service layer. We have userController and jobsController to manage user and job-related HTTP endpoints.


## SOLID Principles

The code adheres to the SOLID principles:

- **Single Responsibility Principle:** Each class or function has a single reason to change.
- **Open-Closed Principle:** The code is open for extension but closed for modification.
- **Liskov Substitution Principle:** Subtypes must be substitutable for their base types.
- **Interface Segregation Principle:** Client-specific interfaces are better than one general-purpose interface.
- **Dependency Inversion Principle:** High-level modules should not depend on low-level modules. Both should depend on abstractions.

## Setup

To set up and run this project locally, follow the steps in the [Installation Guide](#installation-guide).



## Run Locally

Clone the project

```bash
  git clone https://github.com/Aymsep/JobApp_Clean_Architecture
```

Go to the project directory

```bash
  cd my-project
```

Set up environment variables:

Create a `.env` file and configure environment variables.


Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

