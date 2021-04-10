const AWS = require("aws-sdk");
const async = require("async");
const _ = require("underscore");

AWS.config.update({
  region: "ap-northeast-2"
})

const docClient = new AWS.DynamoDB.DocumentClient();

let results = [];
let startKey = [];
let pages = 0;

async.doWhilst(
  //iteration
  (callback)=> {
    let params = {
      TableName: "noob_comments",
      Limit: 2
    }
    if(!_.isEmpty(startKey)){
      params.ExclusiveStartKey = startKey; 
    }
    docClient.scan(params,(err, data)=>{
      if(err){
        console.error(err);
        callback(err,{});
      }else{
        if(typeof data.LastEvaluatedKey !== "undefined"){
          // 다음 페이지 호출
          startKey = data.LastEvaluatedKey;
        }else{
          // 마지막 데이터
          startKey = [];
        }
        if(!_.isEmpty(data.Items)){
          // result 들어오면 계속해서 concat
          results = _.union(results, data.Items);
        }
        pages++;
        callback(null,results);
      }
    })
  },
  //truth test
  () => {
    console.log("현재 스타트키, 빌때까지 true 반환", startKey);
    if(_.isEmpty(startKey)){
      return false;
    }else{
      return true;
    }
  },
  //callback
  (err, data) => {
    if(err){
      console.error(err);
    }else{
      console.log(data);
      console.log("data length: ", data.length ?? 0);
      console.log("pages: ", pages);
    }
  },
)