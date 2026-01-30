pipeline {
    agent any

    environment {
        // Credentials IDs
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        AWS_CREDS             = credentials('AWSLasitha667')

        // Environment Variables
        DOCKERHUB_USERNAME    = 'lasitha667'
        AWS_ACCESS_KEY_ID     = "${AWS_CREDS_USR}"
        AWS_SECRET_ACCESS_KEY = "${AWS_CREDS_PSW}"
        AWS_REGION            = "us-east-1"
        JAVA_HOME             = "/usr/lib/jvm/java-21-amazon-corretto.x86_64"
        PATH                  = "${JAVA_HOME}/bin:${PATH}"
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
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend (React)') {
            steps {
                dir('front') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images using docker-compose..."
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

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    // Start of script block
                    def frontendImageLocal  = "travel_guide_devops-frontend"
                    def backendImageLocal   = "travel_guide_devops-backend"
                    
                    def frontendImageRemote = "${DOCKERHUB_USERNAME}/travel_guide_devops-frontend:latest"
                    def backendImageRemote  = "${DOCKERHUB_USERNAME}/travel_guide_devops-backend:latest"

                    // Tag and Push
                    sh """
                        docker tag ${frontendImageLocal} ${frontendImageRemote}
                        docker tag ${backendImageLocal} ${backendImageRemote}
                        docker push ${frontendImageRemote}
                        docker push ${backendImageRemote}
                    """
                }
            }
        }

        stage('Terraform Init & Plan') {
            steps {
                dir('terraform') {
                    // Clean previous state to avoid conflicts if needed, though usually safe to keep
                    sh 'rm -rf .terraform .terraform.lock.hcl terraform.tfstate terraform.tfstate.backup *.pem'
                    
                    sh 'terraform init -reconfigure -input=false'
                    sh 'terraform plan -out=tfplan'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    sh 'terraform apply -auto-approve tfplan'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    def instanceUsername = 'ec2-user'
                    def keyName = 'tourGuide-app-key.pem'
                    
                    dir('terraform') {
                        // Get the public IP from Terraform outputs
                        def ipProxy = sh(script: "terraform output -raw instance_public_ip", returnStdout: true).trim()
                        
                        // Ensure key permissions are correct for SSH
                        sh "chmod 400 ${keyName}"

                        // SSH and Deploy
                        sh """
                            ssh -i ${keyName} -o StrictHostKeyChecking=no ${instanceUsername}@${ipProxy} '
                                # Wait for Docker to be ready (user_data might still be running)
                                echo "Waiting for Docker setup to finish..."
                                until [ -f /var/lib/cloud/instance/docker-ready ]; do
                                    sleep 5
                                    echo "Still waiting for Docker..."
                                done
                                echo "Docker setup complete."
                                sudo systemctl status docker --no-pager

                                # Login to Docker Hub on the EC2 instance
                                echo "$DOCKERHUB_CREDENTIALS_PSW" | sudo docker login \
                                    -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin

                                # Pull latest images
                                sudo docker pull ${DOCKERHUB_USERNAME}/travel_guide_devops-backend:latest
                                sudo docker pull ${DOCKERHUB_USERNAME}/travel_guide_devops-frontend:latest

                                # Stop & remove old containers if they exist
                                sudo docker rm -f tour-backend || true
                                sudo docker rm -f tour-frontend || true

                                # Run Backend (Port 8000)
                                sudo docker run -d \
                                    --name tour-backend \
                                    -p 8000:8000 \
                                    -e SPRING_DATA_MONGODB_URI="mongodb+srv://englasithacoc:72VWjVFPSBf3YeKG@lasitha.fbzokq9.mongodb.net/Users?retryWrites=true&w=majority" \
                                    ${DOCKERHUB_USERNAME}/travel_guide_devops-backend:latest

                                # Run Frontend (Port 5173)
                                sudo docker run -d \
                                    --name tour-frontend \
                                    -p 5173:5173 \
                                    ${DOCKERHUB_USERNAME}/travel_guide_devops-frontend:latest
                            '
                        """
                    }
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