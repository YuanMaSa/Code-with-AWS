<?php
// Fetching Values from URL
$firstname=$_POST['first-name'];
$lastname=$_POST['last-name'];
$email=$_POST['email'];
$phone=$_POST['phone'];
$title=$_POST['title'];
$organization=$_POST['organization'];
?>
<!DOCTYPE html>
<html>
<head>
<title>Javascript Set Form Action Example</title>
<!-- Include CSS File Here -->
<link rel="stylesheet" href="css/style.css"/>
</head>
<body>
<div class="container">
<div class="main">
<h2>Form Data Received Here</h2>
<form>
<label>Firstname : </label><label><?php echo $firstname; ?></label>
<label>Lastname : </label><label><?php echo $lastname; ?></label>
<label>Email : </label><label><?php echo $email; ?></label>
<a href="index.html" class="back">Back</a>
</form>
</div>
</div>
</body>
</html>
