<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");


include_once 'database.php';
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents('php://input'));

$type = $data->type;

switch($type) {
    case 'message':
        pollUnreadMessages($data, $db);
    break;

    case 'notification':
        pollNotifications($data, $db);
        break;
}

function pollUnreadMessages($data, $db) {
    $id = $data->id;
    $query = 'select id, unread from message where whoto = ? and unread = 1';
    $stmt = $db->prepare($query);
    $stmt->execute(array($id));
    $result = $stmt->fetchAll(PDO::FETCH_CLASS);
    echo json_encode($result);
}

function pollNotifications($data, $db) {
    $id = $data->id;
    $query = 'select id, unread from notifications where towho = ? and unread = 1';
    $stmt = $db->prepare($query);
    $stmt->execute(array($id));
    $result = $stmt->fetchAll(PDO::FETCH_CLASS);
    echo json_encode($result);
}



?>