<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cityname = $_POST['data'];
}

$server = "localhost";
$username = "root";
$password = "";

$con = mysqli_connect($server, $username, $password);

if(!$con){
    die("Connection Fail for: ". mysqli_connect_error());
}
echo $cityname;

$sql =  "INSERT INTO `weatherproject`.`cityhistory` (`cityname`, `requesttime`) VALUES ('$cityname', current_timestamp());";

if(mysqli_query($con, $sql)){
    echo "SucessFully Inserted";
}
else{
    echo "ERROR:  $sql <br> $con->error";
}

mysqli_close($con);
?>