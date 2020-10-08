node ('SpotChrome'){

tools {nodejs "node"}

 def npm = tool name: 'NodeJS12.0'
stage('Checkout') {
          checkout([$class: 'GitSCM', branches: [[name: '*/master']],
                          extensions       : [[$class: 'CloneOption', timeout: 30]],
                          userRemoteConfigs: [[url: 'https://github.com/sapienstech/angular-example.git']]
                ])
        }

          stage('Test') {
           sh 'node -v'
                   sh 'npm install'
                   sh 'npm test'

         }
}
