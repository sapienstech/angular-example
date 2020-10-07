node ('master'){
stage('Checkout') {
          checkout([$class: 'GitSCM', branches: [[name: '*/master']],
                          extensions       : [[$class: 'CloneOption', timeout: 30]],
                          userRemoteConfigs: [[url: 'git@github.com:sapienstech/angular-example.git', credentialsId: constants.credentialsGitId]]
                ])
        }

  tools {nodejs "NodeJS8.5"}
  stage('test'){

    echo 'testing...'
    sh 'npm test'
  }
}
