node ('SpotChrome'){

def branchName;
withEnv(["CHROME_BIN=/usr/bin/google-chrome-stable", "DISPLAY=:99.0", 'CI=true', "NODE_ENV=CI"]) {
        sh 'printenv'
    branchName = getCurrentBranch()
    echo 'My branch is: ' + branchName
}

  def npm = tool name: 'NodeJS12.0'
  stage('Checkout') {
    checkout([$class: 'GitSCM', branches: [[name: branchName]],
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
    withCredentials([string(credentialsId: constants.example, variable: 'SECRET')]) {
        echo "My secret text is '${SECRET}'"
        echo "repo_token: '${SECRET}'
              name: Coveralls GitHub Action
              uses: coverallsapp/github-action@v1.1.2" > coveralls.yml
        nodejs(nodeJSInstallationName: 'NodeJS12.0') {
            sh 'cat ./coverage/my-new-angular-app/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage'
        }
    }
}

}

def getCurrentBranch () {
    if ("$env.BRANCH_NAME" == 'master'){
      return  'master';
    }

    return "$env.CHANGE_BRANCH"
}
