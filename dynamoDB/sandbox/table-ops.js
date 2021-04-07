const AWS = require('aws-sdk');

AWS.config.update({
  region: 'ap-northeast-2'
});

const dynamodb = new AWS.DynamoDB();


dynamodb.listTables({}, (err, data)=> {
  if(err){
    console.error(err);
  }else {
    console.log(data);
  }
})

dynamodb.describeTable({
  TableName: "noob_comments"
}, (err,data)=> {
  if(err){
    console.error(err);
  }else{
    console.log(JSON.stringify(data, null, 2));
  }
})

dynamodb.createTable({
  TableName: "dummyComments",
  AttributeDefinitions: [
    {
      AttributeName: "user_id",
      AttributeType: "S",
    },
    {
      AttributeName: "timestamp",
      AttributeType: "N",
    },
  ],
  KeySchema: [
    {
      AttributeName: "user_id",
      KeyType: "HASH",
    },
    {
      AttributeName: "timestamp",
      KeyType: "RANGE"
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
},(err, data)=> {
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
})

dynamodb.updateTable({
  TableName: "dummyComments",
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 1
  },
},(err, data)=>{
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
})

dynamodb.deleteTable({
  TableName: "dummyComments"
}, (err,data)=> {
  if(err)console.log(err);
  else console.log(data);
})
