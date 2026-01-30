pipeline {
    agent any

    // REMOVED "tools" block because Java 17 is already in the container

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USERNAME = 'lasitha667'
        JAVA_HOME = "/usr/lib/jvm/java-21-amazon-corretto.x86_64"
        PATH = "${JAVA_HOME}/bin:${PATH}"
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

        stage('Clean Conflicting Resources') {
            environment {
                AWS_CREDS = credentials('AWSLasitha667')
                AWS_ACCESS_KEY_ID = "${AWS_CREDS_USR}"
                AWS_SECRET_ACCESS_KEY = "${AWS_CREDS_PSW}"
                AWS_REGION = "us-east-1" 
            }
            steps {
                dir('terraform') {
                    // Make sure cleanup.sh actually exists in your repo!
                    sh 'chmod +x cleanup.sh'
                    sh './cleanup.sh'
                }
            }
        }

        stage('Terraform Init') {
            environment {
                AWS_CREDS = credentials('AWSLasitha667')
                AWS_ACCESS_KEY_ID = "${AWS_CREDS_USR}"
                AWS_SECRET_ACCESS_KEY = "${AWS_CREDS_PSW}"
            }
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Plan') {
            environment {
                AWS_CREDS = credentials('AWSLasitha667')
                AWS_ACCESS_KEY_ID = "${AWS_CREDS_USR}"
                AWS_SECRET_ACCESS_KEY = "${AWS_CREDS_PSW}"
            }
            steps {
                dir('terraform') {
                    sh 'terraform plan'
                }
            }
        }

        stage('Terraform Apply') {
            environment {
                AWS_CREDS = credentials('AWSLasitha667')
                AWS_ACCESS_KEY_ID = "${AWS_CREDS_USR}"
                AWS_SECRET_ACCESS_KEY = "${AWS_CREDS_PSW}"
            }
            steps {
                dir('terraform') {
                    sh 'terraform apply -auto-approve'
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