pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''npm ci --cache ~/.npm
npm run build'''
      }
    }

  }
}