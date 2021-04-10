const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-northeast-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.get({
  TableName: "noob_comments",
  Key: {
    user_id: "bb",
    timestamp: "2010-10-12"
  }
},(err, data)=> {
  if(err){
    console.error(err);
  }else{
    console.log(data);
  }
}) // complete Primary Key 필요함.

docClient.query({
  TableName: "noob_comments",
  KeyConditionExpression: "user_id = :uid",
  ExpressionAttributeValues: {
    ":uid" : "bb"
  }
},(err, data)=> {
  if(err) {
    console.error(err);
  }else{
    console.log(data);
  }
});

docClient.scan({
  TableName: "noob_comments",
  FilterExpression: "category = :category",
  ExpressionAttributeValues: {
    ":category" : "general"
  }
},(err, data)=> {
  if(err) {
    console.error(err);
  }else{
    console.log(data);
  }
})

docClient.batchGet({
  RequestItems: {
    'noob_comments': {
      Keys: [
        {
          user_id: 'bb',
          timestamp: "2010-10-12"
        }
      ]
    },
    'notes': {
      Keys: [
        { 
          userId: 'DUMMY-USER-1234',
          noteId: '01f15120-4d1b-11eb-8b34-754a3cda4c6b',
        },
      ]
    }
  }
}, (err, data)=> {
  if(err){
    console.error(err);
  }else{
    console.log(JSON.stringify(data, null, 2));
  }
}) // Complete Primary Key 필요