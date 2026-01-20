pipeline {
    agent any

    tools {
        jdk 'jdk17'
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USERNAME = 'lasitha667'
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
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Use the names from docker-compose.yml
                    def frontendLocal = "travel_guide_devops-frontend"
                    def backendLocal  = "travel_guide_devops-backend"

                    def frontendRemote = "docker.io/${DOCKERHUB_USERNAME}/travel_guide_devops-frontend:latest"
                    def backendRemote  = "docker.io/${DOCKERHUB_USERNAME}/travel_guide_devops-backend:latest"

                    sh """
                        docker tag ${frontendLocal} ${frontendRemote} || true
                        docker tag ${backendLocal} ${backendRemote} || true
                        docker push ${frontendRemote} || true
                        docker push ${backendRemote} || true
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
