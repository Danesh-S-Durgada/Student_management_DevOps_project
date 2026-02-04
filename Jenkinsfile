pipeline {
  agent any

  environment {
    DOCKER_USER = "daneshsd2002"

    BACKEND_IMAGE  = "student-backend"
    FRONTEND_IMAGE = "student-frontend"

    TAG = "${BUILD_NUMBER}"

    BACKEND_SERVICE_URL = "http://backend-service:5000"
    K8S_NAMESPACE = "student-app"
  }

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main',
            url: 'https://github.com/Danesh-S-Durgada/Student_management_DevOps_project.git'
      }
    }

    stage('Build Backend Docker Image') {
      steps {
        dir('backend') {
          bat '''
            echo Using backend folder
            docker build -t %DOCKER_USER%/%BACKEND_IMAGE%:%TAG% .
            docker tag %DOCKER_USER%/%BACKEND_IMAGE%:%TAG% %DOCKER_USER%/%BACKEND_IMAGE%:latest
          '''
        }
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        dir('frontend') {
          bat '''
            echo Using frontend folder
            docker build --build-arg VITE_BACKEND_URL=%BACKEND_SERVICE_URL% ^
              -t %DOCKER_USER%/%FRONTEND_IMAGE%:%TAG% .
            docker tag %DOCKER_USER%/%FRONTEND_IMAGE%:%TAG% %DOCKER_USER%/%FRONTEND_IMAGE%:latest
          '''
        }
      }
    }

    stage('Push Images to Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USERNAME',
          passwordVariable: 'DOCKER_PASSWORD'
        )]) {
          bat '''
            echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin

            docker push %DOCKER_USER%/%BACKEND_IMAGE%:%TAG%
            docker push %DOCKER_USER%/%BACKEND_IMAGE%:latest

            docker push %DOCKER_USER%/%FRONTEND_IMAGE%:%TAG%
            docker push %DOCKER_USER%/%FRONTEND_IMAGE%:latest

            docker logout
          '''
        }
      }
    }

    stage('Debug Kubernetes Access') {
      steps {
        bat '''
          echo ===== Checking kubectl =====
          kubectl version --client

          echo ===== Current Context =====
          kubectl config current-context

          echo ===== Nodes =====
          kubectl get nodes
        '''
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        bat '''
          kubectl apply -f k8s\\namespace.yaml

          kubectl apply -n %K8S_NAMESPACE% -f k8s\\mongo-secret.yaml
          kubectl apply -n %K8S_NAMESPACE% -f k8s\\

          kubectl set image deployment/backend backend=%DOCKER_USER%/%BACKEND_IMAGE%:%TAG% -n %K8S_NAMESPACE%
          kubectl set image deployment/frontend frontend=%DOCKER_USER%/%FRONTEND_IMAGE%:%TAG% -n %K8S_NAMESPACE%

          kubectl rollout status deployment/backend -n %K8S_NAMESPACE%
          kubectl rollout status deployment/frontend -n %K8S_NAMESPACE%
        '''
      }
    }
  }

  post {
    success {
      echo "✅ CI/CD Pipeline completed successfully"
    }
    failure {
      echo "❌ CI/CD Pipeline failed"
    }
    always {
      bat 'docker image prune -f'
    }
  }
}
