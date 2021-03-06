const moment = require('moment');
const AWS = require('aws-sdk');

const greet = {
  ko: "안녕하세요.",
  jp: "ohayo",
  en: "hello",
}

AWS.config.update({region: "ap-northeast-2"});

exports.handler = async (event) => {
  let name = event.pathParameters.name;
  let {lang, ...info} = event.queryStringParameters;
  
  let message = `${greet[lang] ? greet[lang] : "default message"} ${name}`;
  let response = {
    message: message,
    info: info,
    timestamp: moment().format("YYYY:MM:DD")
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}