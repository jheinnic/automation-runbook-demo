import * as cdk from 'aws-cdk-lib';
import {AwsService, MockAwsInvoker, Simulation} from "@cdklabs/cdk-ssm-documents";
import {AutomationRunbookDemoStack} from "../lib/automation-runbook-demo-stack";

test('API Selected', () => {
    const app = new cdk.App();
    const stack = new AutomationRunbookDemoStack(app, 'MyTestStack');

    const mockInvoker = new MockAwsInvoker();
    mockInvoker.whenThen({
        // WHEN api is called ...
        service: AwsService.STS,
        awsApi: 'getCallerIdentity',
        awsParams: {}
        }, {
        // THEN respond with ...
        "UserId": "myUserId",
        "Account": "0123456789012",
        "Arn": "arn:aws:sts::0123456789012:assumed-role/myAssumedRole/myUserId"
    });

    const response = Simulation.ofAutomation(stack.myDoc, {
        awsInvoker: mockInvoker
    }).simulate({
        Action: "API"
    });
    expect(response.outputs?.['api.User']).toEqual("myUserId");
}); 

test('Script Selected', () => {
    const app = new cdk.App();
    const stack = new AutomationRunbookDemoStack(app, 'MyTestStack');

    const mockInvoker = new MockAwsInvoker();
    mockInvoker.whenThen({
        // WHEN api is called ...
        service: AwsService.LAMBDA,
        awsApi: 'invoke',
        awsParams: {"FunctionName":"myFunctionName","InvocationType":"RequestResponse","LogType":"Tail"}
    }, {
        // THEN respond with ...
        StatusCode: 200,
        Payload: "Hello from the simulator."
    });
    const response = Simulation.ofAutomation(stack.myDoc, {
        awsInvoker: mockInvoker
    }).simulate({Action: 'Lambda'});
    expect(response.outputs?.['lambda.Payload']).toEqual("Hello from the simulator.");
});
