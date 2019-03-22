# Steps to clone the repository and run a docker container for 12factor sample node application

1) Clone the git repository in Visual Studio Code using the terminal:

        git clone <https://github.com/ActiveHealth/Integrators_portfolio>

    **Notes**:

    •    Make sure the git proxy is set up on the machine.

    •    Since Multi-factor authentication is enabled for Active           Health, you will need to specify the Access Token when            prompted for the password.

2) Browse to the root folder of the project – ‘12factor-docker-api’

        cd Integrators_portfolio/12factor-docker-api/

3) Create a ‘**.env**’ file within the root directory and copy the following values:

        MONGO_INITDB_DATABASE=noderest
        MONGO_INITDB_DEV_DATABASE=noderest
        DB_DEV_URL=mongodb://Admin:Admin123@172.27.66.55:27017/noderest?authMechanism=SCRAM-SHA-1&authSource=admin
        DB_URL=mongodb://Admin:Admin123@172.27.66.55:27017/noderest?authMechanism=SCRAM-SHA-1&authSource=admin
        MONGO_DATA_DIR=/data/db
        MONGO_TEST_DATA_DIR=/data/test_db
        MONGO_LOG_FILE=/var/log/mongodb/mongodb.log
        MONGO_PORT=27017
        MONGO_VERSION=4.0
        PORT=8081

    **Notes:**

        •    A ‘.env’ file should be used only for development purpose. 
        •    This file can contain environment specific details such as port, external service credentials, etc. 
        •    This file should NOT be checked into Github as it can contain sensitive information.

4) Build the image using ‘docker-compose’ using the below command:

        docker-compose -f docker/prod/docker-compose-production.yml build

        Run ‘docker images’ command to check if the image is created. You should be able to see ‘prod_nodeapp’ listed.

5) Create and run the container using the below ‘docker-compose’ command:

        docker-compose -f docker/prod/docker-compose-production.yml up –d

        Check if the container is running by executing ‘docker ps –a’ command. You should be able to see 2 containers up and running: ‘prod_nodeapp’ and ‘mongo:4.0’

6) The node application should be accessible on port **8081** (mapped to 8081 within the container)

7) The sample node application supports the following operations:

    a)    Display all musicians:
    
        GET:
        http://localhost:8081/musicians/all

    b) Get Musicians by Id:
    
        GET:
        http://localhost:8081/musicians/:ID

    c)       Delete a Musician by Id:
    
        DELETE:
        http://localhost:8081/musicians/delete/:ID

    d)      Add a musician:
    
        POST:
        http://localhost:8081/musicians/new

        { "name": "Freddie", "band": "Queen", "instrument": "Vocalist" }

    e)  Update a musician by Id:
    
        PATCH:
        http://localhost:8081/musicians/edit/:ID
        
        {"name": "Bono", "band": "U2", "instrument": "Drums" }
