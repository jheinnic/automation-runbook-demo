#!/bin/sh

CDK_NEW_BOOTSTRAP=1 npx cdk bootstrap --profile irtemp -i --tags costcenter=10051227 --tags division=csd --tags environment=nonprod --tags application=datalake --tags app_role=demoSsm --qualifier demo-ssm --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess --toolkit-stack-name csd-demo-ssm --trust 811617080253 --trust-for-lookup 811617080253 --trust 284611682665 --trust-for-lookup 284611682665 --context tryctxt=tryvalue --context deployment=demo-ssm -v aws://284611682665/us-east-2
