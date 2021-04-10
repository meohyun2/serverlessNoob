const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.put({
  TableName: "noob_comments",
  Item: {
    user_id: "conditional_option_user",
    timestamp: "2020-02-02",
    title: "conditional put operation",
    content: "hello"
  },
  ConditionExpression: "#t <> :t",
  ExpressionAttributeNames: {
    "#t": "timestamp"
  },
  ExpressionAttributeValues: {
    ":t": "2020-02-02"
  }
},(err, data) => {
  if(err){
    console.error(err);
  }else{
    console.log(data);
  }
})