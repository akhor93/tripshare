var fs = require('fs');
var AWS = require('aws-sdk'); 
AWS.config.loadFromPath('awscred.json');
var s3 = new AWS.S3();

exports.uploadfile = function(file, user, cb) {
  var usable_path = user._id + "" + file.name;

  fs.stat(file.path, function(err, file_info) {
    var bodyStream = fs.createReadStream(file.path);
    var params = {
      Bucket: "wanderlustapp/uploads",
      Key: usable_path,
      ContentLength: file_info.size,
      Body: bodyStream
    };

    s3.putObject(params, function(err, data) {
      if(err) {
        console.log("Error uploading image: " + err);
        cb(null);
      }
      var completeaddress = "https://s3-us-west-1.amazonaws.com/wanderlustapp/uploads/" + usable_path;
      console.log("uploaded successfully " + completeaddress);
      cb(completeaddress);
    });
  });
}