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
$action = $data->data;

switch($action) {
    case 'getMessages': 
    getMessages($data, $db);
    break;
    case 'sendMessage':
    sendMessage($data, $db);
    break;
    case 'markAsRead':
    markAsRead($data, $db);
    break;
    case 'deleteMessage':
    deleteMessage($data, $db);
}

function getMessages($data, $db) {
    $whoto = $data->receiverId;
    $query = 'select message.id, message.whofrom, message.whoto, message.message, 
    message.time, message.unread, username from message 
    left join user on message.whofrom = user.id where message.whoto = ? 
    order by message.time desc' ;
    $stmt = $db->prepare($query);
    $stmt->execute(array($whoto));
    $result = $stmt->fetchAll(PDO::FETCH_CLASS);
    echo json_encode($result);
}

function sendMessage($data, $db) {
    $whoto = $data->receiverId;
    $sender = $data->senderId;
    $message = $data->message;

    $query = 'insert into message (message, whofrom, whoto, unread)
    values (?,?,?,?)';
    $stmt = $db->prepare($query);
    $result = $stmt->execute(array($message, $sender, $whoto, 1));
    echo json_encode($result);
}

function markAsRead($data, $db) {
    $messageId = $data->id;
    $query = 'update message set unread = false where id = ?';
    $stmt = $db->prepare($query);
    $result = $stmt->execute(array($messageId));
    echo json_encode($result);
}

function deleteMessage($data, $db) {
    $id = $data->id;
    $query = 'delete from message where id = ?';
    $stmt = $db->prepare($query);
    $result = $stmt->execute(array($id));
    echo json_encode($result);
}



