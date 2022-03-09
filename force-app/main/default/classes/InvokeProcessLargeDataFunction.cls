public class InvokeProcessLargeDataFunction {

    @InvocableMethod(label='Find_Schools')
    public static List<String> invoke() {

        // functions.Function myFunction = functions.Function.get('AcmeFunctionProject.myfunction');
        // functions.FunctionInvocation invocation = myFunction.invoke('{"name":"MyAccount"}');
        // String jsonResponse = invocation.getResponse();


        string functionname = 'AcmeFunctionProject.processlargedataset';
        System.debug('---> function  name : ' + functionname);
        string payload = '{"latitude": "36.169090", "longitude": "-115.140579", "length": 5}';
        // Instantiate the function
        functions.Function ldvFunction = functions.Function.get(functionName);
    
        // Invoke the function
        functions.FunctionInvocation invocation = ldvFunction.invoke(payload);
    
        // Check if there is any error during the invocation
        if (invocation.getStatus() == functions.FunctionInvocationStatus.ERROR) {
          throw new CalloutException(
            (invocation.getError() != null
              ? invocation.getError().getMessage()
              : 'UNKNOWN')
          );
        }
    
        List<String> response = new List<String>();
        response.add(invocation.getResponse());
        for(String s : response) {
          System.debug(s);
        }
    
        // Return the response to the flow
        return response;
      }
}
