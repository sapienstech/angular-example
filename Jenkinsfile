node ('SpotChrome'){

  def npm = tool name: 'NodeJS12.0'
  stage('Checkout') {

  environment {
      FULL_PATH_BRANCH = "${sh(script:'git name-rev --name-only HEAD', returnStdout: true)}"
      GIT_BRANCH = FULL_PATH_BRANCH.substring(FULL_PATH_BRANCH.lastIndexOf('/') + 1, FULL_PATH_BRANCH.length())

    echo "branch name1: $GIT_BRANCH"
      checkout([$class: 'GitSCM', branches: [[name: "$GIT_BRANCH"]],
      extensions       : [[$class: 'CloneOption', timeout: 30]],
      userRemoteConfigs: [[url: 'https://github.com/sapienstech/angular-example.git']]
    ])
  }
  }

  try {
    stage('Test') {
      withEnv(["CHROME_BIN=/usr/bin/google-chrome-stable", "DISPLAY=:99.0", 'CI=true', "NODE_ENV=CI"]) {
        sh 'printenv'
        timeout(40) {
            nodejs(nodeJSInstallationName: 'NodeJS12.0'){
              sh 'npm install'
              sh 'npm install -g @angular/cli'
              sh 'ng test --watch=false --code-coverage'
            }
          }
        }
      }
    } catch (Exception e) {
      println e
      currentBuild.result = 'UNSTABLE'
  }

  stage('Coverall'){

   nodejs(nodeJSInstallationName: 'NodeJS12.0'){
      sh 'cat ./coverage/my-new-angular-app/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage'
    }
  }
}
