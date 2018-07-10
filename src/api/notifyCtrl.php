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

switch($action){
    case 'sendNotification':
        sendNotification($data,$db);
        break;
    case 'getNotifications':
        getNotifiCations($data, $db);
}

function sendNotification($data, $db) {

    $notifyTo = $data->notifyTo;
    $notifyFrom = $data->notifyFrom;
    $notification = $data->notification;

    $query = 'insert into notifications (fromwho, towho, notification, unread)
    values (?,?,?,?)';
    $stmt = $db->prepare($query);
    $result = $stmt->execute(array($notifyFrom, $notifyTo, $notification, 1));
    echo json_encode($result);
}

function getNotifications($data, $db) {
    $notifyTo = $data->notifyTo;
    $query = 'select notifications.id, notifications.fromwho, notifications.towho, notifications.notification, notifications.time, notifications.unread, user.id AS senderID, user.username from notifications 
    right join user on notifications.fromwho = user.id where notifications.towho = ?
        order by notifications.time desc' ;
    $stmt = $db->prepare($query);
    $stmt->execute(array($notifyTo));
    $result = $stmt->fetchAll(PDO::FETCH_CLASS);
    echo json_encode($result);
}