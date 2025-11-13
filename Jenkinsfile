pipeline {
    agent any

    tools {
        jdk 'jdk17' // Make sure this matches the JDK configured in Jenkins Global Tools
        maven 'maven' // Optional if you have Maven configured in Jenkins
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USERNAME = 'Lasitha667'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Lasitha667/Travel_Guide_DevOps.git'
            }
        }

        stage('Build Backend (Spring Boot)') {
            steps {
                dir('Tour') { // Make sure 'Tour' is the actual backend folder
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend (React)') {
            steps {
                dir('front') { // Make sure 'front' is the frontend folder
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images..."
                    sh 'docker compose build'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    def frontendImage = "${DOCKERHUB_USERNAME}/tourguide_frontend:latest"
                    def backendImage = "${DOCKERHUB_USERNAME}/tourguide_backend:latest"

                    sh """
                        docker tag frontend ${frontendImage}
                        docker tag backend ${backendImage}
                        docker push ${frontendImage}
                        docker push ${backendImage}
                    """
                }
            }
        }

        stage('Clean Up') {
            steps {
                sh 'docker system prune -af'
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed! Check logs for details."
        }
    }
}
