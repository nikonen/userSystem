<?php
header('Access-Control-Allow-Origin: *');

include_once 'database.php';
require_once('php-image-magician/php_image_magician.php');

$uploadsDir = '../assets/img';
$database = new Database();
$db = $database->getConnection();

$id = $_REQUEST['id'];

$data = json_decode(file_get_contents("php://input"));

$tempPath = $_FILES['file']['tmp_name'];

$actualName = $_FILES['file']['name'];
var_dump($actualName);
$fileParts = pathinfo($actualName);

switch($fileParts['extension']) {
    
    case "jpg":
    $actualName = hash('md5', $actualName).".jpg";
    break;

    case "png":
    $actualName = hash('md5', $actualName).".png";
    break;


}
try {

    $actualPath = dirname(__FILE__).'./assets/img/'.$actualName;

    move_uploaded_file($tempPath, "$uploadsDir/$actualName");
    $magicianObj = new imageLib("$uploadsDir/$actualName");
    $magicianObj -> resizeImage(150, 150);
    $magicianObj -> saveImage("$uploadsDir/$actualName");
} catch (Exception $x) {
    echo($x);
}


//echo json_encode($actualPath);
$now = 'NOW()';
$query = "update user set picurl=? where id=?";
$stmt = $db->prepare($query);
$result = $stmt->execute(array($actualName, $id));

