pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Realiza o checkout do repositório
                    checkout scm
                }
            }
        }
        stage('Clean, Build and Start') {
            steps {
                script {
                    sh "sudo chmod +x ./install.sh"
                    sh "./install.sh"
                }
            }
        }
    }
}
