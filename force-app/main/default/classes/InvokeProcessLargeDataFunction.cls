public class InvokeProcessLargeDataFunction {

    @InvocableMethod(label='Find_Schools')
    public static List<String> invoke(List<String> data) {

        string functionname = data[0];
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
    
        // Return the response to the flow
        return response;
      }
}
