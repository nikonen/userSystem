<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");


include_once 'database.php';
define('JWT_SECRET', 'secret-phrase-that-should-be-somewhere-else');

$data = json_decode(file_get_contents('php://input'));
$id = $data->id;

$database = new Database();
$db = $database->getConnection();

$query = 'select id, unread from message where whoto = ? and unread = 1';
$stmt = $db->prepare($query);
$stmt->execute(array($id));
$result = $stmt->fetchAll(PDO::FETCH_CLASS);
echo json_encode($result);


?>