node ('SpotChrome'){

 def npm = tool name: 'NodeJS12.0'
stage('Checkout') {
          checkout([$class: 'GitSCM', branches: [[name: '*/master']],
                          extensions       : [[$class: 'CloneOption', timeout: 30]],
                          userRemoteConfigs: [[url: 'https://github.com/sapienstech/angular-example.git']]
                ])
        }

  try {
          stage('Test') {
          withNPM(npmrcConfig:'70dd55ee-2ff7-4e22-b104-57dbad3628f7') {
                      echo "Performing npm build..."
                      sh 'npm install'
                  }

              withEnv(["CHROME_BIN=/usr/bin/google-chrome-stable", "DISPLAY=:99.0", 'CI=true', "NODE_ENV=CI"]) {
                  sh 'printenv'
                  timeout(40) {

                      sh ('npm -version')
                  }
              }
          }

      } catch (Exception e) {
          println e
          currentBuild.result = 'UNSTABLE'
      }
}
