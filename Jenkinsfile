pipeline {
    agent any

    triggers {
        cron('0 2 * * *') // Every day at 2:00 AM
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/utsav32/api-test-playwright.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install -D @playwright/test'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Archive HTML Report') {
            steps {
                // Archive the HTML report
                archiveArtifacts artifacts: 'playwright-report/**/*'
            }
        }
    }

    post {
        always {
            // Archive test results (if using Playwright's JUnit reporter)
            junit 'test-results/*.xml'
        }
    }
}