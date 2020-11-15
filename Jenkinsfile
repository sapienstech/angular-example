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

  withCredentials([usernamePassword(credentialsId: 'constants.example', variable: 'PASSWORD')]) {
             sh '''
                echo $PASSWORD >> tmp
              '''
            }
            sh 'cat tmp'
            }
    withCredentials([string(credentialsId: constants.example, variable: 'SECRET')]) {
        echo "My secret text is '${SECRET}'"
        sh ('echo "repo_token: ${SECRET} \n\rname: Coveralls GitHub Action\n\ruses: coverallsapp/github-action@v1.1.2"  > coveralls.yml ')
    }

    sh ('cat coveralls.yml')
            nodejs(nodeJSInstallationName: 'NodeJS12.0') {
                sh 'cat ./coverage/my-new-angular-app/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage'
            }
}

}

def getCurrentBranch () {
    if ("$env.BRANCH_NAME" == 'master'){
      return  'master';
    }

    return "$env.CHANGE_BRANCH"
}
