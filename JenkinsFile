pipeline {
    agent any

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
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend (React)') {
            steps {
                dir('frontend') {
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
}
