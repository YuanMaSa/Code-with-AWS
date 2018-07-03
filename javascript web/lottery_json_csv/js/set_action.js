// Submit form with id function
function myfunction() {
var firstname = document.getElementById("first-name").value;
var lastname = document.getElementById("last-name").value;
var email = document.getElementById("email").value;
var phone = document.getElementById("phone").value;
var title = document.getElementById("title").value;
var organization = document.getElementById("Organization").value;

if (validation()) // Calling validation function
{
uploadS3();
}
}
// Name and Email validation Function
function validation() {
var firstname = document.getElementById("first-name").value;
var lastname = document.getElementById("last-name").value;
var email = document.getElementById("email").value;
var phone = document.getElementById("phone").value;
var title = document.getElementById("title").value;
var Organization = document.getElementById("Organization").value;
var emailReg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
if (firstname === '' || lastname === '' || email === '' || title === '' || Organization === '') {
alert("Please fill all fields...!!!!!!");
return false;
} else if (!(email).match(emailReg)) {
alert("Invalid Email...!!!!!!");
return false;
} else {
return true;
}
}
