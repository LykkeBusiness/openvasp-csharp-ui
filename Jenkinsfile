pipeline {
  agent any
  stages {
    stage('NPM Build') {
      steps {
        sh '''npm ci --cache ~/.npm
        npm run build'''
      }
    }

    stage('Docker Build') {
      steps {
        sh '''
        docker build --tag openvasporg/${DockerName}:0.${BUILD_ID} ./
        docker tag openvasporg/${DockerName}:0.${BUILD_ID} openvasporg/${DockerName}:latest
        docker login -u=$REGISTRY_AUTH_USR -p=$REGISTRY_AUTH_PSW
        docker push openvasporg/${DockerName}:0.${BUILD_ID}
        docker push openvasporg/${DockerName}:latest'''
      }
    }

    stage('Prepare Yamls') {
      parallel {
        stage('Namespace Check') {
          steps {
            sh '''
            Namespace=$(cat kubernetes/namespace.yaml | grep name |awk \'{print $2}\')
            NSK=$(kubectl --kubeconfig=/kube/dev get namespace "$Namespace" -o jsonpath={.metadata.name} &> /dev/null)
            if [ $NSK ]; then
            echo  Namsespace "$Namespace" Exists
            else
            echo no Namespace $Namespace in cluster found - creating
            kubectl --kubeconfig=/kube/dev apply -f kubernetes/namespace.yaml
            fi'''
          }
        }

        stage('Ingress Check') {
          steps {
            sh '''
            Ingress=$(cat kubernetes/ingress.yaml | grep name |awk \'{print $2}\')
            Namespace=$(cat kubernetes/namespace.yaml | grep name |awk \'{print $2}\')
            ING=$(kubectl --kubeconfig=/kube/dev get ingress $Ingress -n "$Namespace" -o jsonpath={.metadata.name} &> /dev/null)
            if [ $ING ]; then
            echo  Ingress "$Ingress" Exists
            else
            echo no Ingress $Ingress in cluster found - creating
            fi'''
          }
        }

        stage('Substitute Yamls') {
          steps {
            sh '''
            Image=${DockerName}:0.${BUILD_ID}
            sed -i -e \'s/$dockerImage/\'"$Image"\'/g\' kubernetes/deployment.yaml
            sed -i -e \'s/$version/\'"0.${BUILD_ID}"\'/g\' kubernetes/deployment.yaml 
            sed -i -e \'s/$dockerImage/\'"$Image"\'/g\' kubernetes/deployment-2.yaml
            sed -i -e \'s/$version/\'"0.${BUILD_ID}"\'/g\' kubernetes/deployment-2.yaml 
            cat kubernetes/deployment.yaml'''
          }
        }

      }
    }

    stage('Kubernetes Deploy') {
      parallel {
        stage('Kubernetes Deploy') {
          steps {
            sh '''
            kubectl --kubeconfig=/kube/dev apply -f kubernetes/service.yaml
            kubectl --kubeconfig=/kube/dev apply -f kubernetes/deployment.yaml
            kubectl --kubeconfig=/kube/dev apply -f kubernetes/service-2.yaml
            kubectl --kubeconfig=/kube/dev apply -f kubernetes/deployment-2.yaml'''
          }
        }

        stage('Pod Logs') {
          steps {
            sh '''
            sleep 40
            kubectl --kubeconfig=/kube/dev get pods -n services'''
          }
        }

      }
    }

  }
  environment {
    RepoName = 'openvasp-csharp-ui'
    ServiceName = 'openvasp-csharp-ui'
    DockerName = 'csharp-ui'
    REGISTRY_AUTH = credentials('dockerhub')
  }
}