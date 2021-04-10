 const AWS = require("aws-sdk");
 
AWS.config.update({
  region: "ap-northeast-2"
});

const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.put({
//   TableName: "noob_comments",
//   Item: {
//     user_id: "bb",
//     timestamp: "2010-10-12",
//     title: "this is second comment",
//     content: "content"
//   }
// },(err, data)=>{
//   if(err){
//     console.error(err);
//   }else{
//     console.log(data);
//   }
// })

// docClient.update({
//   TableName: "noob_comments",
//   Key: {
//     user_id: "bb",
//     timestamp: "2010-10-12",
//   },
//   UpdateExpression: 'set #t = :t',
//   ExpressionAttributeNames: {
//     '#t': 'title'
//   },
//   ExpressionAttributeValues: {
//     ':t': 'another title'
//   },
// },(err, data)=>{
//   if(err){
//     console.error(err);
//   }else{
//     console.log(data);
//   }
// })

// docClient.delete({
//   TableName: "noob_comments",
//   Key: {
//     user_id: 'bb',
//     timestamp: "2020-10-12"
//   }
// },(err, data)=>{
//   if(err){
//     console.error(err);
//   }else{
//     console.log(data);
//   }
// });

docClient.batchWrite({
  RequestItems: {
    'noob_comments': [
      {
        DeleteRequest: {
          Key: {
            user_id: "bb",
            timestamp: "2010-10-10"
          },
        },
      },
      {
        PutRequest: {
          Item: {
            user_id: "batch-used-write",
            timestamp: "2020-01-01",
            title: "히히",
            content: "안녕!"
          }
        }
      }
    ]
  }
},(err, data)=> {
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
})