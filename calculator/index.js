exports.handler = async (event) => {
  let {operand1, operand2} = event.input;
  let operator = event.operator;
  let result;
  
  switch (operator) {
      case 'plus':
          result = operand1 + operand2;
          break;
      case 'substract':
          result = operand1 - operand2;
          break;
      case 'multiply':
          result = operand1 * operand2;
          break;
      case 'divide':
          result = operand1 / operand2;
          break;
      default:
          result = "you inputed wrong operation method.";
  }
  
  const response = {
      statusCode: 200,
      body: JSON.stringify(result),
  };
  return response;
};

