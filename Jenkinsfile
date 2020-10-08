pipeline {
  agent 'SpotChrome'

  tools {nodejs "node"}

  stages {

    stage('Build') {
      steps {
        sh 'npm install'
      }
    }


    stage('Test') {
      steps {
        sh 'node test'
      }
    }
  }
}
