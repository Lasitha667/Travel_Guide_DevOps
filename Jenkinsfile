pipeline {
    agent any

    tools {
        maven 'maven3'
        nodejs 'node20'
    }

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub')
        AWS_CREDS       = credentials('AWSLasitha667')

        DOCKERHUB_USERNAME = 'lasitha667'
        AWS_ACCESS_KEY_ID     = "${AWS_CREDS_USR}"
        AWS_SECRET_ACCESS_KEY = "${AWS_CREDS_PSW}"
        AWS_REGION = "us-east-1"

        JAVA_HOME = "/usr/lib/jvm/java-21-amazon-corretto.x86_64"
        PATH = "${JAVA_HOME}/bin:${PATH}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Lasitha667/Travel_Guide_DevOps.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('Tour') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('front') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                // Ensure 'docker-compose' is installed on the server
                sh 'docker-compose build'
            }
        }

        stage('Docker Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                script {
                    // FIX: Match the image names Docker Compose actually created (lowercase, no underscores)
                    def localFrontend = "tourguidedevops-frontend"
                    def localBackend  = "tourguidedevops-backend"

                    // This is the name you want on Docker Hub
                    def remoteFrontend = "${DOCKERHUB_USERNAME}/travel_guide_devops-frontend:latest"
                    def remoteBackend  = "${DOCKERHUB_USERNAME}/travel_guide_devops-backend:latest"

                    sh """
                        echo "Tagging images..."
                        docker tag ${localFrontend} ${remoteFrontend}
                        docker tag ${localBackend}  ${remoteBackend}

                        echo "Pushing images..."
                        docker push ${remoteFrontend}
                        docker push ${remoteBackend}
                    """
                }
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                dir('terraform') {
                    sh '''
                      # Only delete the temporary .terraform folder
                      # Never delete terraform.tfstate!
                      rm -rf .terraform
                      
                      terraform init
                      terraform apply -auto-approve
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    def ip = sh(script: "terraform -chdir=terraform output -raw instance_public_ip", returnStdout: true).trim()
                    
                    // Set permissions for the key before using it
                    sh 'chmod 400 terraform/tourGuide-app-key.pem'

                    sh """
                    ssh -i terraform/tourGuide-app-key.pem -o StrictHostKeyChecking=no ec2-user@${ip} '
                        # Use sudo for docker commands on the EC2 instance
                        sudo docker login -u ${DOCKERHUB_CREDS_USR} -p ${DOCKERHUB_CREDS_PSW}

                        sudo docker pull ${DOCKERHUB_USERNAME}/travel_guide_devops-backend:latest
                        sudo docker pull ${DOCKERHUB_USERNAME}/travel_guide_devops-frontend:latest

                        sudo docker rm -f tour-backend tour-frontend || true

                        sudo docker run -d --name tour-backend -p 8000:8000 \
                          -e SPRING_DATA_MONGODB_URI="mongodb+srv://englasithacoc:72VWjVFPSBf3YeKG@lasitha.fbzokq9.mongodb.net/Users?retryWrites=true&w=majority" \
                          ${DOCKERHUB_USERNAME}/travel_guide_devops-backend:latest

                        sudo docker run -d --name tour-frontend -p 5173:5173 \
                          ${DOCKERHUB_USERNAME}/travel_guide_devops-frontend:latest
                    '
                    """
                }
            }
        }

        stage('Cleanup Jenkins') {
            steps {
                sh 'docker system prune -af'
            }
        }
    }
}