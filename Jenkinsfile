pipeline {
    agent { docker { image 'node:8.12.0' } }
    environment {
        HOME = '.'
    }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}