var messages = [
  "Hello World",
  "Hello Daehyun",
  "Hello 세상",
  "Hello Daehyun",
  "Hello 헬로",
  "Hello Daehyun",
  "Hello 히히",
  "Hello Daehyun",
  "Hello 호호",
  "Hello 대현",
  "Hello World",
  "Hello Daehyun",
];

exports.handler = async(event, context) => {
let message = messages[Math.floor(Math.random()*10)];
console.error("Error Logging");
console.log("Logging");
console.info("info logging");
console.warn("warn logging");
return message;
}
