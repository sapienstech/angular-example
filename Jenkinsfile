node ('SpotChrome'){

 def npm = tool name: 'NodeJS10.0'
stage('Checkout') {
          checkout([$class: 'GitSCM', branches: [[name: '*/master']],
                          extensions       : [[$class: 'CloneOption', timeout: 30]],
                          userRemoteConfigs: [[url: 'git@github.com:sapienstech/angular-example.git', credentialsId: constants.credentialsGitId]]
                ])
        }

  try {
          stage('Test') {
              withEnv(["CHROME_BIN=/usr/bin/google-chrome-stable", "DISPLAY=:99.0", 'CI=true', "NODE_ENV=CI"]) {
                  sh 'printenv'
                  timeout(40) {
                      npm -version
                  }
              }
          }

      } catch (Exception e) {
          println e
          currentBuild.result = 'UNSTABLE'
      }
}
