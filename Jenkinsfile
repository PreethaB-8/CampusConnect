pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Automated Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Archive Artifact') {
            steps {
                archiveArtifacts artifacts: 'campusconnect.zip', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'CampusConnect CI pipeline completed successfully.'
        }

        failure {
            echo 'CampusConnect CI pipeline failed.'
        }
    }
}