const im = require('iamgemagick');
const fs = require('fs');
const os = require('os');
const uuidv4 = require('uuid/v4');
const {promisify} = require('util');
const AWS = require('aws-sdk');

const resizeAsync = promisify(im.resize);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

AWS.config.update({region: 'ap-northeast-2'});
const s3 = new AWS.S3();

exports.handler = async(event) => {
  let fileProcessed = event.Records.map( async (record)=> {
    let bucket = record.s3.bucket.name;
    let filename = recode.s3.object.key;

    // Get file from s3
    var params = {
      Bucket: bucket,
      Key: filename
    }
    let inputData = s3.getObject(params).promise();
    // resize
    let tempFile = os.tmpdir () + '/' + uuidv4 + '.jpg';
    let resizeArgs = {
      srcData: inputData.Body,
      dstpath: tempFile,
      width: 150
    };
    await resizeAsync(resizeArgs);
    // read resized
    let resizedData = await readFileAsync(tempFile);

    // upload
    let targetFileName = filename.substring(0, filename.lastIndexof('.') + '-small.jpg');
    var params = {
      Bucket: bucket + '-dest',
      Key: targetFileName,
      Body: new Buffer(resizedData),
      ContentType: 'image/jpeg'
    };

    await s3.putObject(params).promise();
    return await unlinkAsync(tempFile);
  })

  await Promise.all(fileProcessed);
  console.log("done");
  return "done";
}