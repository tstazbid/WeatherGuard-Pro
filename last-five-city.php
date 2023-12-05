<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weatherproject";

$conn = new mysqli($servername, $username, $password, $dbname);

// connection check
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT cityname FROM cityhistory ORDER BY requesttime DESC LIMIT 5";
$result = $conn->query($sql);

$cities = array();
if ($result->num_rows > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $cities[] = $row['cityname'];
        
    }
    //echo $cities;
} else {
    echo "no cityes found";
}
// Convert the array to JSON format
$cities_json = json_encode($cities);

// Send the JSON response
header('Content-Type: application/json');
echo $cities_json;

$conn->close();
?>