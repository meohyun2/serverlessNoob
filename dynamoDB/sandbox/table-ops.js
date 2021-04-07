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
