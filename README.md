# Bus ticket Booking Application Backend

The backend of the bus booking application is structured using a microservices architecture with a dedicated API Gateway built using Node.js and Express. The API Gateway uses http-proxy-middleware to intelligently route requests to services like the Booking Service, which handles all booking-related operations, and the Search Service, which provides advanced search functionality for buses and trips. The Authentication Service uses JWTs for secure user sessions and bcrypt for password hashing. Rate limiting is implemented to prevent abuse, and RabbitMQ manages asynchronous communication between services. Each service is designed with scalability in mind, employing a modular structure to facilitate maintenance and future enhancements. We use Sequelize ORM with MySQL for data management, ensuring efficient and reliable database interactions. For deployment, we utilize Docker containers to manage the different services, and automated tests are run using Mocha and Chai to ensure code quality."


## Getting Started

To get started with this project, follow these steps:

- Clone the repository to your local machine.
- Install the required dependencies for each service.
- Start each service by running the appropriate command in its directory.
- Use the API gateway to make requests to the backend services.
  
## Technologies Used

This project uses the following technologies:

- Node.js
- Express
- MySql
- RabbitMq
- Sequelize

## Contributing
If you'd like to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch for your changes.
- Make your changes and commit them to your branch.
- Submit a pull request.
  
## Contact
If you have any questions or comments about this project, please contact at gupta.ritik2002@gmail.com.
