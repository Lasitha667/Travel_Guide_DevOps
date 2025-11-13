pipeline {
    agent any

    tools {
        // Use the JDK configured in Jenkins (add JDK 17 in Global Tool Configuration as 'jdk17')
        jdk 'jdk17'
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
                dir('Tour') {
                    sh '''
                        echo "Using Java version:"
                        java -version
                        mvn clean package -DskipTests
                    '''
                }
            }
        }

        stage('Build Frontend (React)') {
            steps {
                dir('front') {
                    sh '''
                        npm install
                        npm run build
                    '''
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
                    // Avoid Groovy string interpolation to keep secret safe
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Make sure the images exist before pushing
                    sh 'docker images'

                    def frontendImage = "docker.io/${DOCKERHUB_USERNAME}/tourguidedevops-frontend:latest"
                    def backendImage = "docker.io/${DOCKERHUB_USERNAME}/tourguidedevops-backend:latest"

                    sh """
                        # Tag images with Docker Hub repository
                        docker tag tourguidedevops-frontend ${frontendImage}
                        docker tag tourguidedevops-backend ${backendImage}

                        # Push images
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
