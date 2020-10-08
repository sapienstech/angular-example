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
                                withEnv(["CHROME_BIN=/usr/bin/google-chrome-stable", "DISPLAY=:99.0", 'CI=true', "NODE_ENV=CI"]) {
                                    sh 'printenv'
                                    timeout(40) {
                                          nodejs(nodeJSInstallationName: 'NodeJS12.0'){
                                              sh 'npm install -g @angular/cli'
                                                           sh 'npm test'

                                                    }
                                    }
                                }
                            }

                        } catch (Exception e) {
                            println e
                            currentBuild.result = 'UNSTABLE'
                        }

}
