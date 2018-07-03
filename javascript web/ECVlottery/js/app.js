function uploadS3() {
  document.getElementById('btn').disabled = true ;
  document.getElementById("btn").textContent="Wait for lottory ...";
  var firstname = document.getElementById('first-name');
  console.log(firstname.value);
  var lastname = document.getElementById('last-name');
  var email = document.getElementById('email');
  var phone = document.getElementById('phone');
  var title = document.getElementById('title');
  var organization = document.getElementById('Organization');
  var body = '{"customer":{"firstname":"'+firstname.value+'","lastname":"'+lastname.value+'","email":"'+email.value+'","phone":"'+phone.value+'","title":"'+title.value+'","organization":"'+organization.value+'"}}';
  var filename = email.value+"_"+phone.value+".json"
  console.log(body);

  var s3 = new AWS.S3();
  var params = {Bucket: 'ecv-customer-detail', Key: filename, Body: body};
  s3.upload(params, function(err, data) {
    if (err) console.log(err, err.stack);// an error occurred
    else console.log(data);window.location = 'result.html';
  });
};
