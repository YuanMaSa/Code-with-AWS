AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'your_pool_id',
});
var arr = new Array();
var json_data;
document.getElementById('btn').disabled = true;
document.getElementById("btn").textContent = "Downloading file ...";
var bucket = new AWS.S3({
  params: {
    Bucket: 'ecv-customer-detail'
  }
});
// -------------------list s3 bucket objects-------------------
bucket.listObjects(function(err, data) {
  if (err) {
    document.getElementById('status').innerHTML =
      'Could not load objects from S3';
    console.log(err);
    console.log(data);
  } else {
    document.getElementById('status').innerHTML =
      'Loaded ' + data.Contents.length + ' items from S3';
    for (var i = 0; i < data.Contents.length; i++) {
      // document.getElementById('objects').innerHTML +=
      // 	'<li>' + data.Contents[i].Key + '</li>';
      arr = data.Contents[i].Key;
      // console.log(arr);
      // var data = data.Contents[i].Key;
      // -------------------get s3 bucket objects-------------------
      var get_data = new AWS.S3({
        params: {
          Bucket: 'ecv-customer-detail',
          Key: data.Contents[i].Key
        }
      });
      get_data.getObject(function(err2, data2) {
        if (err2) {
          document.getElementById('status2').innerHTML =
            'Could not load objects from S3';
          console.log(err2);
          console.log(data2);
        } else {
          var string_data = data2.Body.toString('utf-8');
          json_data = JSON.parse(data2.Body);
          // console.log(json_data);
          // console.log('success');
          // console.log(json_data.customer);


        }

      });

    }
    var lambda = new AWS.Lambda();
    var pullParams = {
      FunctionName: 'json_to_csv',
      InvocationType: 'RequestResponse',
      LogType: 'None'
    };
    // ------------invoke lambda backup file in s3------------
    lambda.invoke(pullParams, function(error, data) {
      if (error) {
        prompt(error);
        console.log('invoke error!!');
      } else {
        pullResults = JSON.parse(data.Payload);
        console.log(data.StatusCode);
        console.log(pullResults);
        console.log('invoke success!!');
        alert("successfully backup client file");
        document.getElementById('btn').disabled = false;
        document.getElementById("btn").textContent = "Download customer file";
        // ------------------------download csv to local------------------------
        // var json_array = Object.keys(pullResults).map(function (key) { return pullResults[key]; });
        // console.log(json_array);
        // var obj = pullResults.find(function (obj) { return obj.customer });
        var x = new Array();
        console.log(pullResults.length);

        // var csv = Papa.unparse(pullResults);
        var csv;
        var target = [];
        var arrlist = [];
        var myArray;
        var element = document.createElement('a');

        for(var i = 0; i<pullResults.length; i++){
          x = pullResults[i];

          myArray = Object.keys(x).map(i => x[i]);

          arrlist = arrlist.concat(myArray);

        }
        csv = Papa.unparse(arrlist);

        target.push(csv);
        console.log("target:  "+target);
        console.log(arrlist);
        // console.log(target);
        // console.log(typeof target);
        // csv = Papa.unparse(myArray);
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(target));
        element.setAttribute('download', 'client_data.csv');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    });

  }
});
