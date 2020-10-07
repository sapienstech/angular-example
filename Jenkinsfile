node ('master'){
stage('Checkout') {
          checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'github_decisionbot', url: 'https://github.com/sapienstech/angular-example']]])

        }
  stage('test'){

    echo 'testing...'
    sh 'npm test'
  }
}
