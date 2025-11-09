pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'atharvbhosale'               // Replace with your Docker Hub username
        DOCKERHUB_PASS = credentials('5dfc95e5-f25e-47f4-ad66-c1e6a5a0088e')  // Jenkins credential ID
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                git branch: 'main', url: 'https://github.com/AtharvB911/MicroservicesCI.git'
            }
        }

        stage('Build User Service Docker Image') {
            steps {
                echo 'Building User Service Docker image...'
                dir('user-service') {
                    bat 'docker build -t %DOCKERHUB_USER%/user-service:latest .'
                }
            }
        }

        stage('Build Order Service Docker Image') {
            steps {
                echo 'Building Order Service Docker image...'
                dir('order-service') {
                    bat 'docker build -t %DOCKERHUB_USER%/order-service:latest .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo 'Logging into Docker Hub...'
                bat 'echo %DOCKERHUB_PASS% | docker login -u %DOCKERHUB_USER% --password-stdin'
            }
        }

        stage('Push Docker Images') {
            steps {
                echo 'Pushing Docker images to Docker Hub...'
                bat 'docker push %DOCKERHUB_USER%/user-service:latest'
                bat 'docker push %DOCKERHUB_USER%/order-service:latest'
            }
        }

        stage('Deploy Containers') {
            steps {
                echo 'Deploying containers...'
                bat 'docker stop user-service || exit 0'
                bat 'docker stop order-service || exit 0'
                bat 'docker rm user-service || exit 0'
                bat 'docker rm order-service || exit 0'
                bat 'docker run -d --name user-service -p 4000:4000 %DOCKERHUB_USER%/user-service:latest'
                bat 'docker run -d --name order-service -p 5000:5000 %DOCKERHUB_USER%/order-service:latest'
            }
        }
    }

    post {
        always {
            echo 'Listing running containers:'
            bat 'docker ps'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check the console output.'
        }
    }
}
