# Github CI/CD Pipeline

## Info 

### Project Information

This handles deployment for a http api gateway, integrated lambda, and dynamodb table.

### Pipeline Information

The pipeline provides the following features:
- on every push/pull request, create new build deploying to development AWS environment for stage **feature-branch**

  - run linting, type checking, and unit tests before deploying

  - run integration tests, and system tests after deploying

- on every **feature-branch** (PR) merge to main, only main branch is used for subsequent builds;
  
  - start build to remove stage **feature-branch** from development AWS environment
  
  - start build to deploy stage **test** to development AWS environment
    
    - run all checks (lint & type) & tests (unit, integration, system) 

  - on success, start build to deploy stage **staging** on production AWS environment

    - run all checks (lint & type) & tests (unit, integration, system, smoke)

  - on success, deploy to stage **prod**, perform quality assurance testing and monitoring

    - run all checks (lint & type) & tests (unit, integration, system, smoke)

### Credentials Information

Best Practices with Credentials

- Do not store credentials in your repository's code!
- Use Assume Role directly using GitHub OIDC provider; over IAM User, Assume Role using IAM User credentials, or Assume Role using WebIdentity Token File credentials
- Grant least privilege to the credentials used in GitHub Actions workflows. Grant only the permissions required to deploy the project's AWS services.
- Monitor the activity of the credentials used in GitHub Actions workflows.

For more information...
- [Github Workflow: Setting up AWS Credentials for Github Actions](https://github.com/aws-actions/configure-aws-credentials)
- [Github Workflow: Event that Trigger Workflows](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows)
- [AWS Documentation: IAM Policy Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)


## CI/CD Architecture

<p align="center">
  <img src="/cicd-pipeline-diagram.drawio.svg" />
</p>

## Service Architecture

<p align="center">
  <img src="/architecture-diagram.drawio.svg" />
</p>

## Usage 

### Credentials:
```bash
export AWS_PROFILE=<profile_name>
```

### Install Dependencies:

```bash
yarn run install
```

### Deploy:

```bash
yarn run deploy
```

### Invoke Locally:

```bash
yarn run invoke <function-name> <file-name>
```
**file-name = "with_body" or "without_body"**

### Run Unit Tests:

```bash
yarn run test:unit
```

### Run Integration Tests:

```bash
yarn run test:integration --stage <stage> --region <region>
```

### Run System Tests:

```bash
yarn run test:system --stage <stage> --region <region>
```

### Remove:

```bash
yarn run remove
```

## Testing Information

Following the [Test Pyramid Principle](https://martinfowler.com/articles/practical-test-pyramid.html#TheTestPyramid), putting most test effort into unit tests at the bottom of the pyramid. As you progress down the list below the number of tests becomes less.

### Unit tests
Unit tests are very low level, close to the source of your application. They consist in testing individual methods and functions of the classes, components or modules used by your software. Unit tests are in general quite cheap to automate and can be run very quickly by a continuous integration server.

### Integration / Functional tests
Integration tests verify that different modules or services used by your application work well together. For example, it can be testing the interaction with the database or making sure that microservices work together as expected. These types of tests are more expensive to run as they require multiple parts of the application to be up and running.

Functional tests focus on the business requirements of an application. They only verify the output of an action and do not check the intermediate states of the system when performing that action.

There is sometimes a confusion between integration tests and functional tests as they both require multiple components to interact with each other. The difference is that an integration test may simply verify that you can query the database while a functional test would expect to get a specific value from the database as defined by the product requirements.

### System (End-to-end) tests
End-to-end testing replicates a user behavior with the software in a complete application environment. It verifies that various user flows work as expected and can be as simple as loading a web page or logging in or much more complex scenarios verifying email notifications, online payments, etc...

End-to-end tests are very useful, but they're expensive to perform and can be hard to maintain when they're automated. It is recommended to have a few key end-to-end tests and rely more on lower level types of testing (unit and integration tests) to be able to quickly identify breaking changes.

Test the whole microservice as a system i.e. Lambda, API Gw, DynamoDB etc before and after it is merged. This will find an issue in integration between components that might not be found with mocks in unit tests. The tests are run in the feature branch build (before merge to master) and again on the master branch after the merge, so that untested code is not merged and if anything odd happens in the merge it will be caught.

### Smoke tests
Smoke tests are basic tests that check basic functionality of the application. They are meant to be quick to execute, and their goal is to give you the assurance that the major features of your system are working as expected.

Smoke tests can be useful right after a new build is made to decide whether or not you can run more expensive tests, or right after a deployment to make sure that they application is running properly in the newly deployed environment.

Only to be done on staging AWS env after the merge to master with a very limited set of test cases. Finding an issue here should be extremely rare, but could be something related to credentials or permissions. There is no need to replicate the system tests, instead the smoke tests should focus on checking the systems are all connected to each other properly e.g. that API X can call API Y in the most common happy- path case, but not testing the 5 different operations that the API supports. Because staging must be a copy of prod, this will always be a full e2e test (another good reason to limit the scope!).
