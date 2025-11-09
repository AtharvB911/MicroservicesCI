pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'atharvbhosale'
        DOCKERHUB_PASS = credentials('5dfc95e5-f25e-47f4-ad66-c1e6a5a0088e')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/AtharvB911/MicroservicesCI.git'
            }
        }

        stage('Build User Service') {
            steps {
                script {
                    dir('user-service') {
                        sh 'docker build -t ${DOCKERHUB_USER}/user-service:latest .'
                    }
                }
            }
        }

        stage('Build Order Service') {
            steps {
                script {
                    dir('order-service') {
                        sh 'docker build -t ${DOCKERHUB_USER}/order-service:latest .'
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                sh 'docker push ${DOCKERHUB_USER}/user-service:latest'
                sh 'docker push ${DOCKERHUB_USER}/order-service:latest'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh 'docker run -d -p 4000:4000 ${DOCKERHUB_USER}/user-service:latest'
                sh 'docker run -d -p 5000:5000 ${DOCKERHUB_USER}/order-service:latest'
            }
        }
    }

    post {
        always {
            sh 'docker ps'
        }
    }
}
